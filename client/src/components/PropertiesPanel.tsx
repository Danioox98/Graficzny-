import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { fabric } from 'fabric';
import { useEditorStore } from '@/utils/store';
import { LayersPanel } from './LayersPanel';

export const PropertiesPanel: React.FC = () => {
  const { canvas, selectedObjects } = useEditorStore();
  const [properties, setProperties] = useState<any>({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [imageFilters, setImageFilters] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
  });

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
    } else if (key === 'fill' && (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox')) {
      // Specjalna obsługa koloru dla tekstu
      (obj as any).set('fill', value);
      // Wymuś aktualizację wszystkich znaków dla i-text
      if (obj.type === 'i-text' || obj.type === 'textbox') {
        const text = (obj as any).text;
        const textLength = text ? text.length : 0;
        (obj as any).setSelectionStart(0);
        (obj as any).setSelectionEnd(textLength);
        (obj as any).setSelectionStyles({ fill: value });
        (obj as any).setSelectionStart(textLength);
        (obj as any).setSelectionEnd(textLength);
        (obj as any).exitEditing();
      }
    } else {
      (obj as any)[key] = value;
    }

    obj.setCoords();
    canvas.requestRenderAll(); // Użyj requestRenderAll dla lepszej wydajności
    setProperties({ ...properties, [key]: value });
  };

  const applyImageFilter = (filterType: string, value: number) => {
    if (!canvas || selectedObjects.length !== 1) return;
    const obj = selectedObjects[0];
    if (obj.type !== 'image') return;

    const img = obj as fabric.Image;

    // Remove existing filters of this type
    if (img.filters) {
      img.filters = img.filters.filter((f: any) => {
        if (!f) return false;
        const type = f.type.toLowerCase();
        return type !== filterType.toLowerCase();
      });
    } else {
      img.filters = [];
    }

    // Add new filter if value is not default
    if (filterType === 'brightness' && value !== 0) {
      img.filters.push(new fabric.Image.filters.Brightness({ brightness: value / 100 }));
    } else if (filterType === 'contrast' && value !== 0) {
      img.filters.push(new fabric.Image.filters.Contrast({ contrast: value / 100 }));
    } else if (filterType === 'saturation' && value !== 0) {
      img.filters.push(new fabric.Image.filters.Saturation({ saturation: value / 100 }));
    } else if (filterType === 'blur' && value > 0) {
      img.filters.push(new fabric.Image.filters.Blur({ blur: value / 100 }));
    }

    img.applyFilters();
    canvas.requestRenderAll();

    setImageFilters({ ...imageFilters, [filterType]: value });
  };

  const applyTextStyle = (style: { fontSize: number; fontWeight: string; fontFamily?: string }) => {
    if (!canvas || selectedObjects.length !== 1) return;

    const obj = selectedObjects[0];
    if (obj.type !== 'i-text' && obj.type !== 'text') return;

    (obj as any).fontSize = style.fontSize;
    (obj as any).fontWeight = style.fontWeight;
    if (style.fontFamily) {
      (obj as any).fontFamily = style.fontFamily;
    }

    obj.setCoords();
    canvas.requestRenderAll();
    setProperties({
      ...properties,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      ...(style.fontFamily ? { fontFamily: style.fontFamily } : {}),
    });
  };

  if (selectedObjects.length === 0) {
    return (
      <div className="editor-sidebar-right bg-white p-4 space-y-4">
        <LayersPanel />

        <div>
          <h3 className="text-lg font-semibold mb-4">Właściwości</h3>
          <p className="text-gray-500 text-sm">Wybierz obiekt aby edytować jego właściwości</p>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            <div className="font-semibold mb-2">💡 Wskazówki:</div>
            <ul className="text-xs space-y-1">
              <li>• Kliknij dwukrotnie tekst, żeby go zmienić</li>
              <li>• Przytrzymaj Shift, żeby proporcjonalnie skalować</li>
              <li>• Przeciągnij obiekty, żeby je przesunąć</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (selectedObjects.length > 1) {
    return (
      <div className="editor-sidebar-right bg-white p-4 space-y-4">
        <LayersPanel />

        <div>
          <h3 className="text-lg font-semibold mb-4">Właściwości</h3>
          <p className="text-gray-500 text-sm">Wybrano {selectedObjects.length} obiektów</p>
        </div>
      </div>
    );
  }

  const obj = selectedObjects[0];
  const isText = obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox';

  return (
    <div className="editor-sidebar-right bg-white p-4 space-y-4 overflow-y-auto">
      <LayersPanel />

      <div>
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

            {/* Paleta kolorów firmowych */}
            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <label className="block text-xs font-semibold text-gray-700 mb-2">🎨 Kolory firmowe</label>
              <div className="grid grid-cols-6 gap-2">
                {[
                  { color: '#000000', label: 'Czarny' },
                  { color: '#ffffff', label: 'Biały' },
                  { color: '#3b82f6', label: 'Niebieski' },
                  { color: '#10b981', label: 'Zielony' },
                  { color: '#f59e0b', label: 'Pomarańczowy' },
                  { color: '#ef4444', label: 'Czerwony' },
                  { color: '#8b5cf6', label: 'Fioletowy' },
                  { color: '#ec4899', label: 'Różowy' },
                  { color: '#6b7280', label: 'Szary' },
                  { color: '#0ea5e9', label: 'Błękitny' },
                  { color: '#14b8a6', label: 'Turkusowy' },
                  { color: '#f97316', label: 'Bursztynowy' },
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => updateProperty('fill', item.color)}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-all hover:scale-110"
                    style={{ backgroundColor: item.color }}
                    title={item.label}
                  />
                ))}
              </div>
            </div>
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

        {/* Zaawansowane efekty */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            ✨ Zaawansowane efekty
          </h4>

          {/* Cień */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-3 rounded-lg border border-gray-200 mb-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={!!(selectedObjects[0] as any).shadow}
                onChange={(e) => {
                  const obj = selectedObjects[0];
                  if (e.target.checked) {
                    (obj as any).shadow = {
                      color: 'rgba(0,0,0,0.3)',
                      blur: 10,
                      offsetX: 5,
                      offsetY: 5,
                    };
                  } else {
                    (obj as any).shadow = null;
                  }
                  canvas?.requestRenderAll();
                }}
                className="rounded"
              />
              Cień
            </label>

            {(selectedObjects[0] as any).shadow && (
              <div className="space-y-2 mt-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rozmazanie</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={(selectedObjects[0] as any).shadow.blur || 10}
                    onChange={(e) => {
                      const obj = selectedObjects[0];
                      (obj as any).shadow.blur = parseInt(e.target.value);
                      canvas?.requestRenderAll();
                    }}
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Offset X</label>
                    <input
                      type="number"
                      value={(selectedObjects[0] as any).shadow.offsetX || 0}
                      onChange={(e) => {
                        const obj = selectedObjects[0];
                        (obj as any).shadow.offsetX = parseInt(e.target.value);
                        canvas?.requestRenderAll();
                      }}
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Offset Y</label>
                    <input
                      type="number"
                      value={(selectedObjects[0] as any).shadow.offsetY || 0}
                      onChange={(e) => {
                        const obj = selectedObjects[0];
                        (obj as any).shadow.offsetY = parseInt(e.target.value);
                        canvas?.requestRenderAll();
                      }}
                      className="input text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Obwódka (Stroke) */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Obwódka</label>
              <input
                type="checkbox"
                checked={!!(selectedObjects[0] as any).stroke}
                onChange={(e) => {
                  const obj = selectedObjects[0];
                  if (e.target.checked) {
                    (obj as any).stroke = '#000000';
                    (obj as any).strokeWidth = 2;
                  } else {
                    (obj as any).stroke = undefined;
                    (obj as any).strokeWidth = 0;
                  }
                  canvas?.requestRenderAll();
                }}
                className="rounded"
              />
            </div>

            {(selectedObjects[0] as any).stroke && (
              <div className="space-y-2 mt-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Kolor obwódki</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={(selectedObjects[0] as any).stroke}
                      onChange={(e) => {
                        const obj = selectedObjects[0];
                        (obj as any).stroke = e.target.value;
                        canvas?.requestRenderAll();
                      }}
                      className="w-10 h-10 rounded border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={(selectedObjects[0] as any).stroke}
                      onChange={(e) => {
                        const obj = selectedObjects[0];
                        (obj as any).stroke = e.target.value;
                        canvas?.requestRenderAll();
                      }}
                      className="input text-sm flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Grubość: {(selectedObjects[0] as any).strokeWidth || 1}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={(selectedObjects[0] as any).strokeWidth || 1}
                    onChange={(e) => {
                      const obj = selectedObjects[0];
                      (obj as any).strokeWidth = parseInt(e.target.value);
                      canvas?.requestRenderAll();
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Filters */}
        {selectedObjects[0]?.type === 'image' && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              🎨 Filtry obrazu
            </h4>

            <div className="space-y-3">
              {/* Brightness */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ☀️ Jasność: {imageFilters.brightness}%
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={imageFilters.brightness}
                  onChange={(e) => applyImageFilter('brightness', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Contrast */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-3 rounded-lg border border-slate-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🌓 Kontrast: {imageFilters.contrast}%
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={imageFilters.contrast}
                  onChange={(e) => applyImageFilter('contrast', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Saturation */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg border border-pink-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎨 Nasycenie: {imageFilters.saturation}%
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={imageFilters.saturation}
                  onChange={(e) => applyImageFilter('saturation', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Blur */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💫 Rozmycie: {imageFilters.blur}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={imageFilters.blur}
                  onChange={(e) => applyImageFilter('blur', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Reset filters button */}
              <button
                onClick={() => {
                  setImageFilters({ brightness: 0, contrast: 0, saturation: 0, blur: 0 });
                  const img = selectedObjects[0] as fabric.Image;
                  img.filters = [];
                  img.applyFilters();
                  canvas?.requestRenderAll();
                }}
                className="w-full btn btn-secondary text-sm py-2"
              >
                🔄 Resetuj filtry
              </button>
            </div>
          </div>
        )}

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

            {/* Presety stylów tekstu */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">⚡ Szybkie style</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => applyTextStyle({ fontSize: 48, fontWeight: 'bold', fontFamily: 'Arial' })}
                  className="px-3 py-2 text-xs bg-white hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                >
                  Nagłówek
                </button>
                <button
                  onClick={() => applyTextStyle({ fontSize: 24, fontWeight: 'bold', fontFamily: 'Arial' })}
                  className="px-3 py-2 text-xs bg-white hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                >
                  Podtytuł
                </button>
                <button
                  onClick={() => applyTextStyle({ fontSize: 14, fontWeight: 'normal', fontFamily: 'Arial' })}
                  className="px-3 py-2 text-xs bg-white hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                >
                  Treść
                </button>
                <button
                  onClick={() => applyTextStyle({ fontSize: 10, fontWeight: 'normal', fontFamily: 'Arial' })}
                  className="px-3 py-2 text-xs bg-white hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                >
                  Mały tekst
                </button>
              </div>
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
    </div>
  );
};
