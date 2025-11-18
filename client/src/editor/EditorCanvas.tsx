import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '@/utils/store';
import { mmToPixels } from '@/utils/products';

interface EditorCanvasProps {
  width: number;  // mm
  height: number; // mm
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCanvas, addToHistory, setSelectedObjects, showGrid } = useEditorStore();
  const [showGuides] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Konwersja mm na piksele (300 DPI dla druku)
    const canvasWidth = mmToPixels(width);
    const canvasHeight = mmToPixels(height);

    // Inicjalizacja canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    // Ustawienie canvas w store
    setCanvas(fabricCanvas);

    // Linie cięcia i strefy bezpieczne
    if (showGuides) {
      drawPrintGuides(fabricCanvas, width, height);
    }

    // Grid
    if (showGrid) {
      drawGrid(fabricCanvas, canvasWidth, canvasHeight);
    }

    // Event handlery
    fabricCanvas.on('selection:created', (e: fabric.IEvent) => {
      setSelectedObjects((e as any).selected || []);
    });

    fabricCanvas.on('selection:updated', (e: fabric.IEvent) => {
      setSelectedObjects((e as any).selected || []);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObjects([]);
    });

    fabricCanvas.on('object:modified', () => {
      addToHistory(JSON.stringify(fabricCanvas.toJSON()));
    });

    fabricCanvas.on('object:added', () => {
      addToHistory(JSON.stringify(fabricCanvas.toJSON()));
    });

    // Dodaj początkowy stan do historii
    addToHistory(JSON.stringify(fabricCanvas.toJSON()));

    // Cleanup
    return () => {
      fabricCanvas.dispose();
      setCanvas(null);
    };
  }, [width, height]);

  // Aktualizacja gridu
  useEffect(() => {
    const canvas = useEditorStore.getState().canvas;
    if (canvas) {
      if (showGrid) {
        drawGrid(canvas, canvas.width!, canvas.height!);
      } else {
        // Usuń grid
        const objects = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
        objects.forEach((obj: fabric.Object) => canvas.remove(obj));
        canvas.renderAll();
      }
    }
  }, [showGrid]);

  const drawPrintGuides = (canvas: fabric.Canvas, widthMM: number, heightMM: number) => {
    const safeZone = 3; // 3mm strefa bezpieczna
    const bleed = 3; // 3mm spadów (bleed)

    // Usuń stare linie
    const oldGuides = canvas.getObjects().filter((obj: any) => obj.id === 'print-guide');
    oldGuides.forEach((obj: fabric.Object) => canvas.remove(obj));

    const canvasWidth = mmToPixels(widthMM);
    const canvasHeight = mmToPixels(heightMM);
    const safeZonePx = mmToPixels(safeZone);
    const bleedPx = mmToPixels(bleed);

    // Strefa spadów (bleed) - czerwony prostokąt pokazujący obszar spadów
    // Górna linia spadu
    const bleedTop = new fabric.Rect({
      left: 0,
      top: 0,
      width: canvasWidth,
      height: bleedPx,
      fill: 'rgba(239, 68, 68, 0.1)', // Jasnoczerwonawy
      stroke: '#ef4444',
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
    });
    (bleedTop as any).id = 'print-guide';
    canvas.add(bleedTop);

    // Dolna linia spadu
    const bleedBottom = new fabric.Rect({
      left: 0,
      top: canvasHeight - bleedPx,
      width: canvasWidth,
      height: bleedPx,
      fill: 'rgba(239, 68, 68, 0.1)',
      stroke: '#ef4444',
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
    });
    (bleedBottom as any).id = 'print-guide';
    canvas.add(bleedBottom);

    // Lewa linia spadu
    const bleedLeft = new fabric.Rect({
      left: 0,
      top: 0,
      width: bleedPx,
      height: canvasHeight,
      fill: 'rgba(239, 68, 68, 0.1)',
      stroke: '#ef4444',
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
    });
    (bleedLeft as any).id = 'print-guide';
    canvas.add(bleedLeft);

    // Prawa linia spadu
    const bleedRight = new fabric.Rect({
      left: canvasWidth - bleedPx,
      top: 0,
      width: bleedPx,
      height: canvasHeight,
      fill: 'rgba(239, 68, 68, 0.1)',
      stroke: '#ef4444',
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
    });
    (bleedRight as any).id = 'print-guide';
    canvas.add(bleedRight);

    // Linia cięcia (czarna ciągła) - pokazuje gdzie zostanie przycięty dokument
    const trimRect = new fabric.Rect({
      left: bleedPx,
      top: bleedPx,
      width: canvasWidth - (bleedPx * 2),
      height: canvasHeight - (bleedPx * 2),
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
    (trimRect as any).id = 'print-guide';
    canvas.add(trimRect);

    // Strefa bezpieczna (zielona przerywana) - tu powinien być ważny tekst
    const safeRect = new fabric.Rect({
      left: bleedPx + safeZonePx,
      top: bleedPx + safeZonePx,
      width: canvasWidth - (bleedPx * 2) - (safeZonePx * 2),
      height: canvasHeight - (bleedPx * 2) - (safeZonePx * 2),
      fill: 'transparent',
      stroke: '#10b981',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });
    (safeRect as any).id = 'print-guide';
    canvas.add(safeRect);

    // Przesuń linie do tyłu
    const guides = canvas.getObjects().filter((obj: any) => obj.id === 'print-guide');
    guides.forEach((obj: fabric.Object) => canvas.sendToBack(obj));
    canvas.renderAll();
  };

  const drawGrid = (canvas: fabric.Canvas, width: number, height: number) => {
    const gridSize = mmToPixels(10); // 10mm siatka
    const gridColor = '#e0e0e0';

    // Usuń stary grid
    const oldGrid = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
    oldGrid.forEach((obj: fabric.Object) => canvas.remove(obj));

    // Pionowe linie
    for (let i = 0; i <= width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: gridColor,
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      (line as any).id = 'grid';
      canvas.add(line);
    }

    // Poziome linie
    for (let i = 0; i <= height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: gridColor,
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      (line as any).id = 'grid';
      canvas.add(line);
    }

    const gridObjects = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
    gridObjects.forEach((obj: fabric.Object) => canvas.sendToBack(obj));
    canvas.renderAll();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* Info o formacie */}
      <div className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📐</span>
          <div>
            <div className="font-bold text-blue-900">
              {width} × {height} mm
            </div>
            <div className="text-blue-700 text-xs">
              ✨ 300 DPI • 🎨 CMYK • 🖨️ Druk profesjonalny
            </div>
          </div>
        </div>
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>

      {/* Legenda linii */}
      {showGuides && (
        <div className="mt-4 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>📏</span> Linie pomocnicze - Twój przewodnik po projekcie
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-700">
            <div className="flex items-center gap-2 bg-white p-2 rounded">
              <div className="w-4 h-3 bg-red-100 border border-red-400 flex-shrink-0" style={{ borderStyle: 'dashed' }}></div>
              <span><strong className="text-red-600">Czerwone:</strong> Spady (bleed) - tło do krawędzi</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded">
              <div className="w-4 h-0.5 bg-black flex-shrink-0"></div>
              <span><strong className="text-gray-800">Czarne:</strong> Linia cięcia produktu</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded">
              <div className="w-4 h-0.5 bg-green-500 flex-shrink-0" style={{ borderStyle: 'dashed', borderWidth: '1px' }}></div>
              <span><strong className="text-green-600">Zielone:</strong> Strefa bezpieczna dla tekstu</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
