import { useEffect, useState } from 'react';
import { Eye, EyeOff, Trash2, MoveUp, MoveDown, Type, Image, Square } from 'lucide-react';
import { fabric } from 'fabric';
import { useEditorStore } from '@/utils/store';

export const LayersPanel: React.FC = () => {
  const { canvas } = useEditorStore();
  const [layers, setLayers] = useState<fabric.Object[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<fabric.Object | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const updateLayers = () => {
      const objects = canvas.getObjects().filter((obj: any) =>
        !obj.id || (obj.id !== 'grid' && obj.id !== 'print-guide')
      );
      setLayers([...objects].reverse()); // Reverse to show top layer first
    };

    updateLayers();

    canvas.on('object:added', updateLayers);
    canvas.on('object:removed', updateLayers);
    canvas.on('object:modified', updateLayers);
    canvas.on('selection:created', () => {
      const selected = canvas.getActiveObject();
      setSelectedLayer(selected || null);
    });
    canvas.on('selection:updated', () => {
      const selected = canvas.getActiveObject();
      setSelectedLayer(selected || null);
    });
    canvas.on('selection:cleared', () => {
      setSelectedLayer(null);
    });

    return () => {
      canvas.off('object:added', updateLayers);
      canvas.off('object:removed', updateLayers);
      canvas.off('object:modified', updateLayers);
    };
  }, [canvas]);

  const getLayerIcon = (obj: fabric.Object) => {
    if (obj.type === 'i-text' || obj.type === 'text') return Type;
    if (obj.type === 'image') return Image;
    return Square;
  };

  const getLayerName = (obj: fabric.Object, index: number) => {
    if (obj.type === 'i-text' || obj.type === 'text') {
      const text = (obj as fabric.IText).text || '';
      return text.length > 20 ? text.substring(0, 20) + '...' : text || `Tekst ${index + 1}`;
    }
    if (obj.type === 'image') return `Obraz ${index + 1}`;
    if (obj.type === 'rect') return `Prostokąt ${index + 1}`;
    if (obj.type === 'circle') return `Okrąg ${index + 1}`;
    if (obj.type === 'triangle') return `Trójkąt ${index + 1}`;
    if (obj.type === 'line') return `Linia ${index + 1}`;
    return `Warstwa ${index + 1}`;
  };

  const selectLayer = (obj: fabric.Object) => {
    if (!canvas) return;
    canvas.setActiveObject(obj);
    canvas.renderAll();
    setSelectedLayer(obj);
  };

  const toggleVisibility = (obj: fabric.Object, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canvas) return;
    obj.visible = !obj.visible;
    canvas.renderAll();
    setLayers([...layers]);
  };

  const deleteLayer = (obj: fabric.Object, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canvas) return;
    canvas.remove(obj);
    canvas.renderAll();
  };

  const moveLayer = (obj: fabric.Object, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canvas) return;

    if (direction === 'up') {
      canvas.bringForward(obj);
    } else {
      canvas.sendBackwards(obj);
    }
    canvas.renderAll();

    // Update layers
    const objects = canvas.getObjects().filter((o: any) =>
      !o.id || (o.id !== 'grid' && o.id !== 'print-guide')
    );
    setLayers([...objects].reverse());
  };

  if (!canvas || layers.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Warstwy</h3>
        <p className="text-xs text-gray-500">Brak warstw. Dodaj elementy do projektu.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">Warstwy</h3>
      <div className="space-y-1">
        {layers.map((obj, index) => {
          const Icon = getLayerIcon(obj);
          const isSelected = selectedLayer === obj;

          return (
            <div
              key={index}
              onClick={() => selectLayer(obj)}
              className={`flex items-center gap-2 px-2 py-2 rounded cursor-pointer transition-colors ${
                isSelected ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <Icon size={14} className="flex-shrink-0 text-gray-600" />
              <span className="flex-1 text-xs truncate">
                {getLayerName(obj, layers.length - index - 1)}
              </span>

              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={(e) => moveLayer(obj, 'up', e)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Przesuń do góry"
                >
                  <MoveUp size={12} />
                </button>
                <button
                  onClick={(e) => moveLayer(obj, 'down', e)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Przesuń w dół"
                >
                  <MoveDown size={12} />
                </button>
                <button
                  onClick={(e) => toggleVisibility(obj, e)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title={obj.visible ? 'Ukryj' : 'Pokaż'}
                >
                  {obj.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button
                  onClick={(e) => deleteLayer(obj, e)}
                  className="p-1 hover:bg-red-100 text-red-600 rounded"
                  title="Usuń"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
        Kliknij warstwę aby ją zaznaczyć
      </div>
    </div>
  );
};
