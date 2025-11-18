import { PRODUCTS, CATEGORIES } from '@/utils/products';
import { useEditorStore } from '@/utils/store';
import { Product } from '@/types';

export const ProductSelector: React.FC = () => {
  const { setCurrentProduct } = useEditorStore();

  const handleProductSelect = (product: Product) => {
    setCurrentProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎨 Kreator Graficzny
          </h1>
          <p className="text-xl text-gray-600">
            Zaprojektuj profesjonalne materiały drukowane w kilka minut
          </p>
        </div>

        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const products = PRODUCTS.filter((p) => p.category === category.id);

            return (
              <div key={category.id}>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="card cursor-pointer hover:shadow-xl transition-all hover:scale-105"
                    >
                      <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-6xl">{category.icon}</div>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                      <p className="text-sm text-gray-600 mb-3">
                        {product.width} × {product.height} mm
                      </p>

                      {product.description && (
                        <p className="text-sm text-gray-500 mb-3">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-sm text-gray-600">Od</span>
                        <span className="text-xl font-bold text-primary-600">
                          {product.price.toFixed(2)} zł
                        </span>
                      </div>

                      <button className="w-full btn btn-primary mt-4">
                        Rozpocznij projekt
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
