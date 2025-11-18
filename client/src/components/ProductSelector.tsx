import { useState } from 'react';
import { PRODUCT_CATEGORIES, getProductById } from '@/utils/products';
import { useEditorStore } from '@/utils/store';
import { ChevronLeft } from 'lucide-react';

export const ProductSelector: React.FC = () => {
  const { setCurrentProduct } = useEditorStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSizeSelect = (sizeId: string) => {
    const product = getProductById(sizeId);
    if (product) {
      setCurrentProduct(product);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const currentCategory = PRODUCT_CATEGORIES.find(c => c.id === selectedCategory);

  // Krok 1: Wybór kategorii (Wizytówki lub Banery)
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🎨 Kreator Graficzny dla Drukarni
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Profesjonalny kreator wizytówek i banerów
            </p>
            <p className="text-lg text-gray-500">
              Gotowe szablony • 300 DPI • CMYK • Druk offsetowy
            </p>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Wybierz produkt
            </h2>
            <p className="text-gray-600">
              Zacznij od wyboru rodzaju projektu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRODUCT_CATEGORIES.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="card cursor-pointer hover:shadow-2xl transition-all hover:scale-105 p-8"
              >
                <div className="text-center">
                  <div className="text-8xl mb-6">{category.icon}</div>
                  <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  <button className="w-full btn btn-primary text-lg py-3">
                    Wybierz rozmiar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Krok 2: Wybór rozmiaru
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Powrót do wyboru produktu</span>
        </button>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{currentCategory?.icon}</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            {currentCategory?.name}
          </h2>
          <p className="text-xl text-gray-600">
            {currentCategory?.description}
          </p>
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Wybierz rozmiar
          </h3>
          <p className="text-gray-600">
            {selectedCategory === 'banery' && 'Maksymalna szerokość: 320 cm'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory?.sizes.map((size) => (
            <div
              key={size.id}
              onClick={() => handleSizeSelect(size.id)}
              className="card cursor-pointer hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">{currentCategory.icon}</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {size.name}
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {size.description}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Format: {size.name}
              </p>

              <button className="w-full btn btn-primary">
                Rozpocznij projekt
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
