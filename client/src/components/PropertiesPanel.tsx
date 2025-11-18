import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useEditorStore } from '@/utils/store';

export const PropertiesPanel: React.FC = () => {
  const { canvas, selectedObjects } = useEditorStore();
  const [properties, setProperties] = useState<any>({});
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (selectedObjects.length === 1) {
      const obj = selectedObjects[0];
      setProperties({
        left: Math.round(obj.left || 0),
        top: Math.round(obj.top || 0),
        width: Math.round((obj.width || 0) * (obj.scaleX || 1)),
        height: Math.round((obj.height || 0) * (obj.scaleY || 1)),
        angle: Math.round(obj.angle || 0),
        fill: obj.fill || '#000000',
        opacity: obj.opacity || 1,
        // Text specific
        ...(obj.type === 'i-text' || obj.type === 'text' ? {
          text: (obj as any).text,
          fontSize: (obj as any).fontSize,
          fontFamily: (obj as any).fontFamily,
          fontWeight: (obj as any).fontWeight,
        } : {}),
      });
    } else {
      setProperties({});
    }
  }, [selectedObjects]);

  const updateProperty = (key: string, value: any) => {
    if (!canvas || selectedObjects.length !== 1) return;

    const obj = selectedObjects[0];

    if (key === 'width' || key === 'height') {
      const scale = key === 'width' ? value / obj.width! : value / obj.height!;
      obj.scale(scale);
    } else {
      (obj as any)[key] = value;
    }

    obj.setCoords();
    canvas.renderAll();
    setProperties({ ...properties, [key]: value });
  };

  if (selectedObjects.length === 0) {
    return (
      <div className="editor-sidebar-right bg-white p-4">
        <h3 className="text-lg font-semibold mb-4">Właściwości</h3>
        <p className="text-gray-500 text-sm">Wybierz obiekt aby edytować jego właściwości</p>
      </div>
    );
  }

  if (selectedObjects.length > 1) {
    return (
      <div className="editor-sidebar-right bg-white p-4">
        <h3 className="text-lg font-semibold mb-4">Właściwości</h3>
        <p className="text-gray-500 text-sm">Wybrano {selectedObjects.length} obiektów</p>
      </div>
    );
  }

  const obj = selectedObjects[0];
  const isText = obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox';

  return (
    <div className="editor-sidebar-right bg-white p-4">
      <h3 className="text-lg font-semibold mb-4">Właściwości</h3>

      <div className="space-y-4">
        {/* Pozycja */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pozycja</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">X</label>
              <input
                type="number"
                value={properties.left}
                onChange={(e) => updateProperty('left', parseInt(e.target.value))}
                className="input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Y</label>
              <input
                type="number"
                value={properties.top}
                onChange={(e) => updateProperty('top', parseInt(e.target.value))}
                className="input text-sm"
              />
            </div>
          </div>
        </div>

        {/* Rozmiar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rozmiar</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Szerokość</label>
              <input
                type="number"
                value={properties.width}
                onChange={(e) => updateProperty('width', parseInt(e.target.value))}
                className="input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Wysokość</label>
              <input
                type="number"
                value={properties.height}
                onChange={(e) => updateProperty('height', parseInt(e.target.value))}
                className="input text-sm"
              />
            </div>
          </div>
        </div>

        {/* Obrót */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Obrót: {properties.angle}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={properties.angle}
            onChange={(e) => updateProperty('angle', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Kolor */}
        {properties.fill && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kolor</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-12 h-12 rounded border-2 border-gray-300"
                style={{ backgroundColor: properties.fill }}
              />
              <input
                type="text"
                value={properties.fill}
                onChange={(e) => updateProperty('fill', e.target.value)}
                className="input text-sm flex-1"
              />
            </div>
            {showColorPicker && (
              <div className="mt-2">
                <HexColorPicker
                  color={properties.fill}
                  onChange={(color) => updateProperty('fill', color)}
                />
              </div>
            )}
          </div>
        )}

        {/* Przezroczystość */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Przezroczystość: {Math.round(properties.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={properties.opacity}
            onChange={(e) => updateProperty('opacity', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Text properties */}
        {isText && (
          <>
            <div className="border-t border-gray-200 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tekst</label>
              <textarea
                value={properties.text}
                onChange={(e) => updateProperty('text', e.target.value)}
                className="input text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Czcionka</label>
              <select
                value={properties.fontFamily}
                onChange={(e) => updateProperty('fontFamily', e.target.value)}
                className="input text-sm"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rozmiar czcionki: {properties.fontSize}px
              </label>
              <input
                type="range"
                min="8"
                max="200"
                value={properties.fontSize}
                onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Styl</label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateProperty('fontWeight', properties.fontWeight === 'bold' ? 'normal' : 'bold')}
                  className={`btn-icon ${properties.fontWeight === 'bold' ? 'bg-primary-100' : ''}`}
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => updateProperty('fontStyle', properties.fontStyle === 'italic' ? 'normal' : 'italic')}
                  className={`btn-icon ${properties.fontStyle === 'italic' ? 'bg-primary-100' : ''}`}
                >
                  <em>I</em>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
