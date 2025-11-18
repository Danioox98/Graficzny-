import { useEffect, useRef } from 'react';
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

    // Grid
    if (showGrid) {
      drawGrid(fabricCanvas, canvasWidth, canvasHeight);
    }

    // Event handlery
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObjects(e.selected || []);
    });

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObjects(e.selected || []);
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
        objects.forEach((obj) => canvas.remove(obj));
        canvas.renderAll();
      }
    }
  }, [showGrid]);

  const drawGrid = (canvas: fabric.Canvas, width: number, height: number) => {
    const gridSize = mmToPixels(10); // 10mm siatka
    const gridColor = '#e0e0e0';

    // Usuń stary grid
    const oldGrid = canvas.getObjects().filter((obj: any) => obj.id === 'grid');
    oldGrid.forEach((obj) => canvas.remove(obj));

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

    canvas.sendToBack(...canvas.getObjects().filter((obj: any) => obj.id === 'grid'));
    canvas.renderAll();
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
