import { TEMPLATES, getTemplatesByProduct } from '@/templates';
import { useEditorStore } from '@/utils/store';

export const TemplatesGallery: React.FC = () => {
  const { currentProduct, canvas } = useEditorStore();

  if (!currentProduct) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Wybierz produkt aby zobaczyć dostępne szablony</p>
      </div>
    );
  }

  const templates = getTemplatesByProduct(currentProduct.id);

  const loadTemplate = (templateData: string) => {
    if (!canvas) return;

    canvas.loadFromJSON(templateData, () => {
      canvas.renderAll();
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Szablony - {currentProduct.name}</h3>

      {templates.length === 0 ? (
        <p className="text-gray-500">Brak dostępnych szablonów dla tego produktu</p>
      ) : (
        <div className="template-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card bg-white"
              onClick={() => loadTemplate(template.data)}
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">📄</span>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
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
