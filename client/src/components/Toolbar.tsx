import { useEffect } from 'react';
import {
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Triangle,
  Minus,
  Trash2,
  Star,
  Hexagon,
  Pentagon,
  Slash
} from 'lucide-react';
import { fabric } from 'fabric';
import { useEditorStore, useUIStore } from '@/utils/store';
import { QuickAddPanel } from './QuickAddPanel';

export const Toolbar: React.FC = () => {
  const { canvas, selectedObjects, currentProduct } = useEditorStore();
  const { showNotification } = useUIStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName !== 'INPUT' &&
            document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          deleteSelected();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canvas, selectedObjects]);

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

  const addStar = () => {
    if (!canvas) return;

    // Create a star using polygon
    const points = [];
    const outerRadius = 75;
    const innerRadius = 35;
    const spikes = 5;

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }

    const star = new fabric.Polygon(points, {
      left: 150,
      top: 150,
      fill: '#f1c40f',
      stroke: '#f39c12',
      strokeWidth: 2,
    });

    canvas.add(star);
    canvas.setActiveObject(star);
    canvas.renderAll();
  };

  const addPentagon = () => {
    if (!canvas) return;

    const points = [];
    const radius = 75;
    const sides = 5;

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }

    const pentagon = new fabric.Polygon(points, {
      left: 150,
      top: 150,
      fill: '#9b59b6',
      stroke: '#8e44ad',
      strokeWidth: 2,
    });

    canvas.add(pentagon);
    canvas.setActiveObject(pentagon);
    canvas.renderAll();
  };

  const addHexagon = () => {
    if (!canvas) return;

    const points = [];
    const radius = 75;
    const sides = 6;

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }

    const hexagon = new fabric.Polygon(points, {
      left: 150,
      top: 150,
      fill: '#1abc9c',
      stroke: '#16a085',
      strokeWidth: 2,
    });

    canvas.add(hexagon);
    canvas.setActiveObject(hexagon);
    canvas.renderAll();
  };

  const addEllipse = () => {
    if (!canvas) return;

    const ellipse = new fabric.Ellipse({
      left: 100,
      top: 100,
      rx: 100,
      ry: 60,
      fill: '#e67e22',
      stroke: '#d35400',
      strokeWidth: 2,
    });

    canvas.add(ellipse);
    canvas.setActiveObject(ellipse);
    canvas.renderAll();
  };

  const addArrow = () => {
    if (!canvas) return;

    // Create arrow using path
    const arrow = new fabric.Path('M 0 0 L 200 0 L 200 -20 L 250 20 L 200 60 L 200 40 L 0 40 Z', {
      left: 100,
      top: 100,
      fill: '#34495e',
      stroke: '#2c3e50',
      strokeWidth: 2,
    });

    canvas.add(arrow);
    canvas.setActiveObject(arrow);
    canvas.renderAll();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      fabric.Image.fromURL(event.target?.result as string, (img: fabric.Image) => {
        // Sprawdzenie jakości DPI
        if (currentProduct && img.width && img.height) {
          // Sprawdź czy obraz ma wystarczającą rozdzielczość do pokrycia całego canvas
          const estimatedDPI = Math.min(
            (img.width / currentProduct.width) * 25.4,
            (img.height / currentProduct.height) * 25.4
          );

          if (estimatedDPI < 150) {
            showNotification('⚠️ Niska jakość obrazu! Zalecane minimum 300 DPI dla druku. Obraz może wyglądać rozmyty po wydrukowaniu.');
          } else if (estimatedDPI < 300) {
            showNotification('⚠️ Jakość obrazu mogłaby być lepsza. Zalecane 300 DPI dla optymalnej jakości druku.');
          }
        }

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

        // Dodaj ikonę ostrzeżenia jeśli DPI jest niskie
        if (currentProduct && img.width && img.height) {
          const estimatedDPI = Math.min(
            (img.width / currentProduct.width) * 25.4,
            (img.height / currentProduct.height) * 25.4
          );

          if (estimatedDPI < 300) {
            (img as any).hasQualityWarning = true;
          }
        }

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
      activeObjects.forEach((obj: fabric.Object) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const tools = [
    { icon: Type, label: 'Tekst', action: addText },
    { icon: ImageIcon, label: 'Obraz', action: () => document.getElementById('image-upload')?.click() },
    { icon: Square, label: 'Prostokąt', action: addRectangle },
    { icon: Circle, label: 'Okrąg', action: addCircle },
    { icon: Circle, label: 'Elipsa', action: addEllipse },
    { icon: Triangle, label: 'Trójkąt', action: addTriangle },
    { icon: Pentagon, label: 'Pięciokąt', action: addPentagon },
    { icon: Hexagon, label: 'Sześciokąt', action: addHexagon },
    { icon: Star, label: 'Gwiazda', action: addStar },
    { icon: Minus, label: 'Linia', action: addLine },
    { icon: Slash, label: 'Strzałka', action: addArrow },
  ];

  return (
    <div className="editor-sidebar-left bg-white p-4">
      {/* Szybkie dodawanie - gotowe bloki */}
      <QuickAddPanel />

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
