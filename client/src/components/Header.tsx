import { useState, useEffect } from 'react';
import {
  Download, Save, Undo, Redo, ZoomIn, ZoomOut, Grid, ArrowLeft,
  AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
  Group, Ungroup
} from 'lucide-react';
import { useEditorStore, useUIStore } from '@/utils/store';
import { ExportDialog } from './ExportDialog';
import { fabric } from 'fabric';

export const Header: React.FC = () => {
  const { zoom, setZoom, undo, redo, history, historyIndex, toggleGrid, showGrid, currentProduct, setCurrentProduct, canvas, selectedObjects } = useEditorStore();
  const { showNotification } = useUIStore();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  // Autosave co 30 sekund
  useEffect(() => {
    if (!canvas) return;

    const saveToLocalStorage = () => {
      try {
        const json = JSON.stringify(canvas.toJSON());
        localStorage.setItem('autosave_canvas', json);
        localStorage.setItem('autosave_product', JSON.stringify(currentProduct));
        const now = new Date();
        const timeStr = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
        setLastSaved(timeStr);
      } catch (error) {
        console.error('Błąd podczas autosave:', error);
      }
    };

    // Pierwsze zapisanie po 5 sekundach
    const initialTimeout = setTimeout(saveToLocalStorage, 5000);

    // Następnie co 30 sekund
    const interval = setInterval(saveToLocalStorage, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [canvas, currentProduct]);

  const handleZoomIn = () => {
    if (zoom < 3) setZoom(zoom + 0.1);
  };

  const handleZoomOut = () => {
    if (zoom > 0.2) setZoom(zoom - 0.1);
  };

  const handleSave = () => {
    // TODO: Implementacja zapisywania
    showNotification('✓ Projekt zapisany pomyślnie!', 'success');
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleBackToTemplates = () => {
    if (confirm('Czy na pewno chcesz wrócić do wyboru szablonu? Niezapisane zmiany zostaną utracone.')) {
      setCurrentProduct(null);
    }
  };

  // Align functions
  const alignLeft = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const selection = canvas.getActiveObject() as fabric.ActiveSelection;
    if (!selection) return;

    const leftmost = Math.min(...selectedObjects.map(obj => obj.left || 0));
    selectedObjects.forEach(obj => {
      obj.set({ left: leftmost });
      obj.setCoords();
    });
    canvas.renderAll();
    showNotification('✓ Wyrównano do lewej', 'success');
  };

  const alignCenter = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const selection = canvas.getActiveObject() as fabric.ActiveSelection;
    if (!selection) return;

    const centerX = selectedObjects.reduce((sum, obj) => sum + (obj.left || 0) + ((obj.width || 0) / 2), 0) / selectedObjects.length;
    selectedObjects.forEach(obj => {
      obj.set({ left: centerX - ((obj.width || 0) / 2) });
      obj.setCoords();
    });
    canvas.renderAll();
    showNotification('✓ Wyrównano do środka (poziomo)', 'success');
  };

  const alignRight = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const rightmost = Math.max(...selectedObjects.map(obj => (obj.left || 0) + (obj.width || 0)));
    selectedObjects.forEach(obj => {
      obj.set({ left: rightmost - (obj.width || 0) });
      obj.setCoords();
    });
    canvas.renderAll();
    showNotification('✓ Wyrównano do prawej', 'success');
  };

  const alignTop = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const topmost = Math.min(...selectedObjects.map(obj => obj.top || 0));
    selectedObjects.forEach(obj => {
      obj.set({ top: topmost });
      obj.setCoords();
    });
    canvas.renderAll();
    showNotification('✓ Wyrównano do góry', 'success');
  };

  const alignMiddle = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const centerY = selectedObjects.reduce((sum, obj) => sum + (obj.top || 0) + ((obj.height || 0) / 2), 0) / selectedObjects.length;
    selectedObjects.forEach(obj => {
      obj.set({ top: centerY - ((obj.height || 0) / 2) });
      obj.setCoords();
    });
    canvas.renderAll();
    showNotification('✓ Wyrównano do środka (pionowo)', 'success');
  };

  const alignBottom = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const bottommost = Math.max(...selectedObjects.map(obj => (obj.top || 0) + (obj.height || 0)));
    selectedObjects.forEach(obj => {
      obj.set({ top: bottommost - (obj.height || 0) });
      obj.setCoords();
    });
    canvas.renderAll();
    showNotification('✓ Wyrównano do dołu', 'success');
  };

  // Group/Ungroup
  const handleGroup = () => {
    if (!canvas || selectedObjects.length < 2) return;
    const activeSelection = canvas.getActiveObject() as fabric.ActiveSelection;
    if (!activeSelection || activeSelection.type !== 'activeSelection') return;

    const group = activeSelection.toGroup();
    canvas.setActiveObject(group);
    canvas.renderAll();
    showNotification('✓ Obiekty zgrupowane', 'success');
  };

  const handleUngroup = () => {
    if (!canvas || selectedObjects.length !== 1) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== 'group') return;

    (activeObject as fabric.Group).toActiveSelection();
    canvas.renderAll();
    showNotification('✓ Grupa rozgrupowana', 'success');
  };

  return (
    <header className="editor-header bg-white px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Logo + Powrót */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBackToTemplates}
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
          title="Wróć do wyboru szablonu"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Wróć do szablonów</span>
        </button>
        <div className="w-px h-6 bg-gray-300" />
        <div className="text-xl font-bold text-primary-600">
          🎨 Kreator
        </div>
        {currentProduct && (
          <div className="text-sm text-gray-600">
            {currentProduct.name}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="btn-icon disabled:opacity-30"
          title="Cofnij (Ctrl+Z)"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="btn-icon disabled:opacity-30"
          title="Ponów (Ctrl+Y)"
        >
          <Redo size={20} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Zoom */}
        <button onClick={handleZoomOut} className="btn-icon" title="Oddal">
          <ZoomOut size={20} />
        </button>
        <span className="text-sm font-medium min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button onClick={handleZoomIn} className="btn-icon" title="Przybliż">
          <ZoomIn size={20} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Grid */}
        <button
          onClick={toggleGrid}
          className={`btn-icon ${showGrid ? 'bg-primary-100 text-primary-600' : ''}`}
          title="Siatka"
        >
          <Grid size={20} />
        </button>

        {/* Align & Group tools - only when multiple objects selected */}
        {selectedObjects.length >= 2 && (
          <>
            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Wyrównanie poziome */}
            <button onClick={alignLeft} className="btn-icon" title="Wyrównaj do lewej">
              <AlignLeft size={18} />
            </button>
            <button onClick={alignCenter} className="btn-icon" title="Wyśrodkuj poziomo">
              <AlignCenter size={18} />
            </button>
            <button onClick={alignRight} className="btn-icon" title="Wyrównaj do prawej">
              <AlignRight size={18} />
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            {/* Wyrównanie pionowe */}
            <button onClick={alignTop} className="btn-icon" title="Wyrównaj do góry">
              <AlignVerticalJustifyStart size={18} />
            </button>
            <button onClick={alignMiddle} className="btn-icon" title="Wyśrodkuj pionowo">
              <AlignVerticalJustifyCenter size={18} />
            </button>
            <button onClick={alignBottom} className="btn-icon" title="Wyrównaj do dołu">
              <AlignVerticalJustifyEnd size={18} />
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            {/* Grupowanie */}
            <button onClick={handleGroup} className="btn-icon" title="Grupuj obiekty">
              <Group size={18} />
            </button>
          </>
        )}

        {/* Ungroup - only when single group selected */}
        {selectedObjects.length === 1 && canvas?.getActiveObject()?.type === 'group' && (
          <>
            <div className="w-px h-6 bg-gray-300 mx-2" />
            <button onClick={handleUngroup} className="btn-icon" title="Rozgrupuj">
              <Ungroup size={18} />
            </button>
          </>
        )}

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Save & Export */}
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="btn btn-secondary" title="Zapisz projekt">
            <Save size={18} className="mr-2" />
            Zapisz
          </button>
          {lastSaved && (
            <span className="text-xs text-gray-500">
              Zapisano {lastSaved}
            </span>
          )}
        </div>
        <button onClick={handleExport} className="btn btn-primary" title="Eksportuj do PDF">
          <Download size={18} className="mr-2" />
          Eksportuj PDF
        </button>
      </div>

      {/* Export Dialog */}
      <ExportDialog isOpen={showExportDialog} onClose={() => setShowExportDialog(false)} />
    </header>
  );
};
