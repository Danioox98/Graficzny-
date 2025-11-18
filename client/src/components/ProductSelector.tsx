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
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg">
              🏢 DRUKARNIA GRUPA PLUS
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              🎨 Kreator Graficzny Online
            </h1>
            <p className="text-2xl text-gray-700 mb-3">
              Zaprojektuj profesjonalną wizytówkę lub baner w kilka minut! ⚡
            </p>
            <p className="text-lg text-gray-500 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-2">✨ Łatwy w użyciu</span>
              <span className="flex items-center gap-2">🎯 300 DPI</span>
              <span className="flex items-center gap-2">🖨️ Gotowe do druku</span>
              <span className="flex items-center gap-2">💾 Autosave</span>
            </p>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Co chcesz zaprojektować? 🚀
            </h2>
            <p className="text-gray-600 text-lg">
              Wybierz produkt i zacznij tworzyć!
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

          {/* Footer */}
          <div className="mt-16 text-center text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bold text-blue-600">GRUPA PLUS</span>
              <span>•</span>
              <span>Profesjonalna drukarnia cyfrowa</span>
            </div>
            <div className="text-xs">
              Wysokiej jakości druk wizytówek, ulotek, banerów i więcej
            </div>
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

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-7xl mb-4">{currentCategory?.icon}</div>
          <h2 className="text-5xl font-bold text-gray-900 mb-3">
            {currentCategory?.name}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {currentCategory?.description}
          </p>
          {selectedCategory === 'wizytowki' && (
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
              ✨ Profesjonalna jakość druku offsetowego
            </div>
          )}
          {selectedCategory === 'banery' && (
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
              🎯 Maksymalna szerokość: 320 cm
            </div>
          )}
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-2">
            Wybierz rozmiar projektu 📐
          </h3>
          <p className="text-gray-600 text-lg">
            Wszystkie formaty przygotowane pod druk profesjonalny
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
          ))}</div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-bold text-blue-600">GRUPA PLUS</span>
            <span>•</span>
            <span>Profesjonalna drukarnia cyfrowa</span>
          </div>
          <div className="text-xs">
            Wysokiej jakości druk wizytówek, ulotek, banerów i więcej
          </div>
        </div>
      </div>
    </div>
  );
};
