import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { getTemplatesByProduct, getAllTags } from '@/templates';
import { useEditorStore } from '@/utils/store';

export const TemplatesGallery: React.FC = () => {
  const { currentProduct, canvas } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!currentProduct) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Wybierz produkt aby zobaczyć dostępne szablony</p>
      </div>
    );
  }

  const allTemplates = getTemplatesByProduct(currentProduct.id);
  const availableTags = getAllTags();

  // Filtrowanie szablonów
  const templates = allTemplates.filter(template => {
    // Filtruj po wyszukiwaniu
    const matchesSearch = searchTerm === '' ||
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtruj po tagach
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => template.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const loadTemplate = (templateData: string) => {
    if (!canvas) return;

    canvas.loadFromJSON(templateData, () => {
      canvas.renderAll();
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">
        Szablony - {currentProduct.name}
        <span className="text-sm text-gray-500 ml-2">({allTemplates.length})</span>
      </h3>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Szukaj szablonów..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Tags filter */}
      {availableTags.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Filtruj po tagach:</div>
          <div className="flex flex-wrap gap-2">
            {availableTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-xs text-primary-600 hover:text-primary-700 mt-2"
            >
              Wyczyść filtry
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      {(searchTerm || selectedTags.length > 0) && (
        <div className="mb-3 text-sm text-gray-600">
          Znaleziono: {templates.length} {templates.length === 1 ? 'szablon' : 'szablonów'}
        </div>
      )}

      {/* Templates grid */}
      {templates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Brak szablonów spełniających kryteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTags([]);
            }}
            className="btn btn-secondary mt-4"
          >
            Wyczyść filtry
          </button>
        </div>
      ) : (
        <div className="template-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card bg-white"
              onClick={() => loadTemplate(template.data)}
            >
              <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                <span className="text-5xl">📄</span>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm mb-1 line-clamp-2">{template.name}</h4>
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 2 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{template.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button className="w-full btn btn-secondary">
          Zacznij od pustego projektu
        </button>
      </div>
    </div>
  );
};
