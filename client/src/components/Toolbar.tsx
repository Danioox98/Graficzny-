import {
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Triangle,
  Minus,
  Upload,
  Trash2
} from 'lucide-react';
import { fabric } from 'fabric';
import { useEditorStore } from '@/utils/store';

export const Toolbar: React.FC = () => {
  const { canvas, selectedObjects } = useEditorStore();

  const addText = () => {
    if (!canvas) return;

    const text = new fabric.IText('Dodaj tekst', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addRectangle = () => {
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 150,
      fill: '#3498db',
      stroke: '#2c3e50',
      strokeWidth: 2,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (!canvas) return;

    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 75,
      fill: '#e74c3c',
      stroke: '#c0392b',
      strokeWidth: 2,
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

  const addTriangle = () => {
    if (!canvas) return;

    const triangle = new fabric.Triangle({
      left: 100,
      top: 100,
      width: 150,
      height: 150,
      fill: '#f39c12',
      stroke: '#e67e22',
      strokeWidth: 2,
    });

    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
  };

  const addLine = () => {
    if (!canvas) return;

    const line = new fabric.Line([50, 50, 250, 50], {
      stroke: '#2c3e50',
      strokeWidth: 3,
    });

    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      fabric.Image.fromURL(event.target?.result as string, (img) => {
        // Skaluj obraz jeśli jest za duży
        const maxWidth = canvas.width! * 0.5;
        const maxHeight = canvas.height! * 0.5;

        if (img.width! > maxWidth || img.height! > maxHeight) {
          const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!);
          img.scale(scale);
        }

        img.set({
          left: 100,
          top: 100,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  const deleteSelected = () => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const tools = [
    { icon: Type, label: 'Tekst', action: addText },
    { icon: ImageIcon, label: 'Obraz', action: () => document.getElementById('image-upload')?.click() },
    { icon: Square, label: 'Prostokąt', action: addRectangle },
    { icon: Circle, label: 'Okrąg', action: addCircle },
    { icon: Triangle, label: 'Trójkąt', action: addTriangle },
    { icon: Minus, label: 'Linia', action: addLine },
  ];

  return (
    <div className="editor-sidebar-left bg-white p-4">
      <h3 className="text-lg font-semibold mb-4">Narzędzia</h3>

      <div className="space-y-2">
        {tools.map((tool) => (
          <button
            key={tool.label}
            onClick={tool.action}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <tool.icon size={20} className="text-gray-600" />
            <span>{tool.label}</span>
          </button>
        ))}

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {selectedObjects.length > 0 && (
          <>
            <div className="border-t border-gray-200 my-4" />
            <button
              onClick={deleteSelected}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-left"
            >
              <Trash2 size={20} />
              <span>Usuń</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Skróty klawiszowe</h4>
        <div className="text-xs text-gray-500 space-y-2">
          <div><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+Z</kbd> Cofnij</div>
          <div><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+Y</kbd> Ponów</div>
          <div><kbd className="px-2 py-1 bg-gray-100 rounded">Del</kbd> Usuń</div>
          <div><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+C</kbd> Kopiuj</div>
          <div><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+V</kbd> Wklej</div>
        </div>
      </div>
    </div>
  );
};
