import { Download, Save, Undo, Redo, ZoomIn, ZoomOut, Grid, ShoppingCart } from 'lucide-react';
import { useEditorStore, useCartStore, useUIStore } from '@/utils/store';

export const Header: React.FC = () => {
  const { zoom, setZoom, undo, redo, history, historyIndex, toggleGrid, showGrid, currentProject } = useEditorStore();
  const { items } = useCartStore();
  const { showNotification } = useUIStore();

  const handleZoomIn = () => {
    if (zoom < 3) setZoom(zoom + 0.1);
  };

  const handleZoomOut = () => {
    if (zoom > 0.2) setZoom(zoom - 0.1);
  };

  const handleSave = () => {
    // TODO: Implementacja zapisywania
    showNotification('Projekt zapisany!');
  };

  const handleExport = () => {
    // TODO: Implementacja eksportu do PDF
    showNotification('Eksportowanie do PDF...');
  };

  return (
    <header className="editor-header bg-white px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-primary-600">
          🎨 Kreator Graficzny
        </div>
        {currentProject && (
          <div className="text-sm text-gray-600">
            {currentProject.name}
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
        <button onClick={handleSave} className="btn btn-secondary" title="Zapisz projekt">
          <Save size={18} className="mr-2" />
          Zapisz
        </button>
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
    </header>
  );
};
