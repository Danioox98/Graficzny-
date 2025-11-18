import { useState, useEffect } from 'react';
import { Download, Save, Undo, Redo, ZoomIn, ZoomOut, Grid, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useEditorStore, useCartStore, useUIStore } from '@/utils/store';
import { ExportDialog } from './ExportDialog';

export const Header: React.FC = () => {
  const { zoom, setZoom, undo, redo, history, historyIndex, toggleGrid, showGrid, currentProduct, setCurrentProduct, canvas } = useEditorStore();
  const { items } = useCartStore();
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

      {/* Cart */}
      <div className="flex items-center gap-4">
        <button className="btn-icon relative">
          <ShoppingCart size={24} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </div>

      {/* Export Dialog */}
      <ExportDialog isOpen={showExportDialog} onClose={() => setShowExportDialog(false)} />
    </header>
  );
};
