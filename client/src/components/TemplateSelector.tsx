import { useState } from 'react';
import { FileText, Sparkles, X } from 'lucide-react';
import { getTemplatesByCategory, getTemplateById } from '@/data/templates';
import { useEditorStore, useUIStore } from '@/utils/store';
import { Product } from '@/types';

interface TemplateSelectorProps {
  product: Product;
  onClose: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ product, onClose }) => {
  const { canvas } = useEditorStore();
  const { showNotification } = useUIStore();
  const [selectedTab, setSelectedTab] = useState<'templates' | 'blank'>('templates');

  const templates = getTemplatesByCategory(product.category);

  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (!template) {
      showNotification('Nie znaleziono szablonu', 'error');
      return;
    }

    if (!canvas) {
      showNotification('Canvas nie jest gotowy', 'error');
      return;
    }

    try {
      const templateData = JSON.parse(template.data);

      // Clear canvas first
      canvas.clear();

      // Load template with error handling
      canvas.loadFromJSON(templateData, () => {
        canvas.renderAll();
        showNotification(`✓ Szablon "${template.name}" załadowany!`, 'success');
        onClose();
      }, (o: any, object: any) => {
        // Error callback for individual objects
        console.error('Error loading object:', o, object);
      });
    } catch (error) {
      showNotification('Błąd podczas ładowania szablonu', 'error');
      console.error('Template load error:', error);
    }
  };

  const handleStartBlank = () => {
    canvas?.clear();
    showNotification('✓ Rozpoczęto pusty projekt!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold">Wybierz szablon</h2>
            <p className="text-sm text-primary-100 mt-1">
              {product.name} • {templates.length} gotowych szablonów
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setSelectedTab('templates')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
              selectedTab === 'templates'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Sparkles size={20} />
            Gotowe szablony ({templates.length})
          </button>
          <button
            onClick={() => setSelectedTab('blank')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
              selectedTab === 'blank'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileText size={20} />
            Pusty projekt
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {selectedTab === 'templates' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="group cursor-pointer bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-500 hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {/* Preview placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl opacity-50">{product.category === 'wizytowki' ? '💼' : '🎯'}</div>
                    <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-primary-600 px-4 py-2 rounded-full font-semibold">
                        Wybierz szablon
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-8xl mb-6">📄</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Zacznij od pustego projektu
              </h3>
              <p className="text-gray-600 mb-8 text-center max-w-md">
                Stwórz swój projekt od podstaw. Masz pełną swobodę twórczą!
              </p>
              <button
                onClick={handleStartBlank}
                className="btn btn-primary text-lg px-8 py-4 flex items-center gap-2"
              >
                <Sparkles size={24} />
                Rozpocznij pusty projekt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
