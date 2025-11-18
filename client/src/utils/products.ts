import { Product } from '@/types';

// Rozmiary dla wizytówek
export const BUSINESS_CARD_SIZES = [
  { id: 'wiz-85x55', name: '85×55 mm', width: 85, height: 55, description: 'Standardowy format' },
  { id: 'wiz-90x50', name: '90×50 mm', width: 90, height: 50, description: 'Panoramiczny' },
  { id: 'wiz-90x55', name: '90×55 mm', width: 90, height: 55, description: 'Premium' },
];

// Rozmiary dla banerów (szerokość maks. 320cm)
export const BANNER_SIZES = [
  // Roll-up
  { id: 'baner-rollup-85x200', name: 'Roll-up 85×200 cm', width: 850, height: 2000, description: 'Kompaktowy roll-up' },
  { id: 'baner-rollup-100x200', name: 'Roll-up 100×200 cm', width: 1000, height: 2000, description: 'Standardowy roll-up' },
  { id: 'baner-rollup-120x200', name: 'Roll-up 120×200 cm', width: 1200, height: 2000, description: 'Szeroki roll-up' },
  // Reklamowe (max 320cm szerokości)
  { id: 'baner-reklam-200x100', name: 'Reklamowy 200×100 cm', width: 2000, height: 1000, description: 'Średni baner' },
  { id: 'baner-reklam-300x100', name: 'Reklamowy 300×100 cm', width: 3000, height: 1000, description: 'Duży baner' },
  { id: 'baner-reklam-320x100', name: 'Reklamowy 320×100 cm', width: 3200, height: 1000, description: 'Maksymalny format' },
];

// Główne kategorie produktów
export const PRODUCT_CATEGORIES = [
  {
    id: 'wizytowki',
    name: 'Wizytówki',
    icon: '💼',
    description: 'Profesjonalne wizytówki w 3 formatach',
    sizes: BUSINESS_CARD_SIZES,
  },
  {
    id: 'banery',
    name: 'Banery',
    icon: '🎯',
    description: 'Roll-up i banery reklamowe (maks. 320cm)',
    sizes: BANNER_SIZES,
  },
];

// Backwards compatibility - generuje listę wszystkich produktów
export const PRODUCTS: Product[] = [
  ...BUSINESS_CARD_SIZES.map(size => ({
    id: size.id,
    name: `Wizytówka ${size.name}`,
    category: 'wizytowki' as const,
    width: size.width,
    height: size.height,
    price: 0.50,
    description: size.description,
  })),
  ...BANNER_SIZES.map(size => ({
    id: size.id,
    name: size.name,
    category: 'banery' as const,
    width: size.width,
    height: size.height,
    price: 100.00,
    description: size.description,
  })),
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(p => p.category === category);
};

export const getCategoryById = (id: string) => {
  return PRODUCT_CATEGORIES.find(c => c.id === id);
};

// Stare CATEGORIES dla kompatybilności
export const CATEGORIES = PRODUCT_CATEGORIES;

// Konwersja mm na piksele (300 DPI dla druku)
export const mmToPixels = (mm: number, dpi: number = 300): number => {
  return Math.round((mm / 25.4) * dpi);
};

// Konwersja pikseli na mm
export const pixelsToMm = (pixels: number, dpi: number = 300): number => {
  return (pixels * 25.4) / dpi;
};
