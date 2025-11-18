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

    // Usuń stare linie
    const oldGuides = canvas.getObjects().filter((obj: any) => obj.id === 'print-guide');
    oldGuides.forEach((obj: fabric.Object) => canvas.remove(obj));

    const canvasWidth = mmToPixels(widthMM);
    const canvasHeight = mmToPixels(heightMM);
    const safeZonePx = mmToPixels(safeZone);

    // Strefa bezpieczna (zielona przerywana)
    const safeRect = new fabric.Rect({
      left: safeZonePx,
      top: safeZonePx,
      width: canvasWidth - (safeZonePx * 2),
      height: canvasHeight - (safeZonePx * 2),
      fill: 'transparent',
      stroke: '#10b981',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });
    (safeRect as any).id = 'print-guide';
    canvas.add(safeRect);

    // Ramka główna (czarna - linia cięcia)
    const trimRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: canvasWidth,
      height: canvasHeight,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
    (trimRect as any).id = 'print-guide';
    canvas.add(trimRect);

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
      <div className="mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <strong>{width} × {height} mm</strong> • 300 DPI • CMYK • Gotowe do druku offsetowego
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>

      {/* Legenda linii */}
      {showGuides && (
        <div className="mt-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-xs font-semibold text-gray-700 mb-2">Linie pomocnicze:</div>
          <div className="flex gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-500 border-dashed border-green-500" style={{ borderStyle: 'dashed', borderWidth: '1px' }}></div>
              <span>Strefa bezpieczna (nie umieszczaj tekstu poza tą linią)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-black"></div>
              <span>Linia cięcia</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
