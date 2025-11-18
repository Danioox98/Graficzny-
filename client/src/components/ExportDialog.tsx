import { useState } from 'react';
import { Download, FileText, Settings, X } from 'lucide-react';
import { useEditorStore, useUIStore } from '@/utils/store';
import { exportAPI } from '@/utils/api';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose }) => {
  const { canvas, currentProduct, currentProject } = useEditorStore();
  const { showNotification, setLoading } = useUIStore();

  const [settings, setSettings] = useState({
    dpi: 300,
    bleed: 3,
    colorMode: 'CMYK' as 'RGB' | 'CMYK',
    includeBleed: true,
  });

  const [exporting, setExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    if (!canvas || !currentProduct) {
      showNotification('Brak projektu do eksportu');
      return;
    }

    setExporting(true);
    setLoading(true);

    try {
      const canvasData = JSON.stringify(canvas.toJSON());

      // Download PDF directly
      const blob = await exportAPI.downloadPDF({
        canvasData,
        width: currentProduct.width,
        height: currentProduct.height,
        bleed: settings.includeBleed ? settings.bleed : 0,
        dpi: settings.dpi,
        colorMode: settings.colorMode,
        title: currentProject?.name || currentProduct.name,
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentProject?.name || 'projekt'}_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showNotification('✅ PDF został pobrany!');
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      showNotification('❌ Błąd podczas eksportu PDF');
    } finally {
      setExporting(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-primary-600" />
            <h2 className="text-2xl font-bold">Eksport do PDF</h2>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Informacje o eksporcie</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• PDF będzie gotowy do druku profesjonalnego</li>
              <li>• Domyślna rozdzielczość: 300 DPI (standard drukarski)</li>
              <li>• Kolory w trybie CMYK (offset) lub RGB (cyfrowy)</li>
              <li>• Bleed (spad) zabezpiecza przed białymi krawędziami</li>
            </ul>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings size={20} className="text-gray-600" />
              <h3 className="font-semibold text-lg">Ustawienia eksportu</h3>
            </div>

            {/* DPI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rozdzielczość (DPI)
              </label>
              <select
                value={settings.dpi}
                onChange={(e) => setSettings({ ...settings, dpi: parseInt(e.target.value) })}
                className="input"
              >
                <option value={150}>150 DPI (Draft - szybki podgląd)</option>
                <option value={300}>300 DPI (Standard - druk offsetowy) ⭐</option>
                <option value={600}>600 DPI (Premium - najwyższa jakość)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Wyższa rozdzielczość = lepsza jakość, ale większy plik
              </p>
            </div>

            {/* Color Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tryb kolorów
              </label>
              <select
                value={settings.colorMode}
                onChange={(e) => setSettings({ ...settings, colorMode: e.target.value as 'RGB' | 'CMYK' })}
                className="input"
              >
                <option value="CMYK">CMYK (Druk offsetowy) ⭐</option>
                <option value="RGB">RGB (Druk cyfrowy)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                CMYK dla drukarni offsetowych, RGB dla drukarek cyfrowych
              </p>
            </div>

            {/* Bleed */}
            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={settings.includeBleed}
                  onChange={(e) => setSettings({ ...settings, includeBleed: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Dodaj bleed (spad) - zalecane dla drukarni
                </span>
              </label>

              {settings.includeBleed && (
                <div className="ml-6">
                  <select
                    value={settings.bleed}
                    onChange={(e) => setSettings({ ...settings, bleed: parseInt(e.target.value) })}
                    className="input"
                  >
                    <option value={2}>2 mm</option>
                    <option value={3}>3 mm (Standard) ⭐</option>
                    <option value={5}>5 mm</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Bleed to dodatkowy obszar po brzegach, zabezpiecza przed białymi krawędziami po przycięciu
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          {currentProduct && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">📄 Informacje o produkcie</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Produkt:</span>
                  <span className="ml-2 font-medium">{currentProduct.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Wymiary:</span>
                  <span className="ml-2 font-medium">{currentProduct.width} × {currentProduct.height} mm</span>
                </div>
                <div>
                  <span className="text-gray-600">Z bleedem:</span>
                  <span className="ml-2 font-medium">
                    {currentProduct.width + (settings.includeBleed ? settings.bleed * 2 : 0)} × {currentProduct.height + (settings.includeBleed ? settings.bleed * 2 : 0)} mm
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">DPI:</span>
                  <span className="ml-2 font-medium">{settings.dpi}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button onClick={onClose} className="btn btn-secondary" disabled={exporting}>
            Anuluj
          </button>
          <button
            onClick={handleExport}
            className="btn btn-primary flex items-center gap-2"
            disabled={exporting}
          >
            {exporting ? (
              <>
                <div className="spinner w-5 h-5" />
                Generowanie...
              </>
            ) : (
              <>
                <Download size={18} />
                Pobierz PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
