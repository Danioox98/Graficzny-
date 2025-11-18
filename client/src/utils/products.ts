import { Product } from '@/types';

// FOKUS: Wizytówki i Banery - pozostałe produkty klienci projektują sami
export const PRODUCTS: Product[] = [
  // Wizytówki
  {
    id: 'wiz-85x55',
    name: 'Wizytówka standardowa',
    category: 'wizytowki',
    width: 85,
    height: 55,
    price: 0.50,
    description: 'Standardowa wizytówka 85x55mm - najpopularniejszy format',
  },
  {
    id: 'wiz-90x50',
    name: 'Wizytówka panorama',
    category: 'wizytowki',
    width: 90,
    height: 50,
    price: 0.60,
    description: 'Wizytówka panoramiczna 90x50mm - nowoczesny format',
  },
  {
    id: 'wiz-90x55',
    name: 'Wizytówka Premium',
    category: 'wizytowki',
    width: 90,
    height: 55,
    price: 0.65,
    description: 'Wizytówka Premium 90x55mm - luksusowy format',
  },

  // Banery Roll-up
  {
    id: 'baner-rollup-85x200',
    name: 'Baner Roll-up 85x200cm',
    category: 'banery',
    width: 850,
    height: 2000,
    price: 100.00,
    description: 'Roll-up banner 85x200cm - idealny na targi i eventy',
  },
  {
    id: 'baner-rollup-100x200',
    name: 'Baner Roll-up 100x200cm',
    category: 'banery',
    width: 1000,
    height: 2000,
    price: 120.00,
    description: 'Roll-up banner 100x200cm - najbardziej popularny',
  },
  {
    id: 'baner-rollup-120x200',
    name: 'Baner Roll-up 120x200cm',
    category: 'banery',
    width: 1200,
    height: 2000,
    price: 140.00,
    description: 'Roll-up banner 120x200cm - maksymalna widoczność',
  },

  // Banery reklamowe
  {
    id: 'baner-reklam-200x100',
    name: 'Baner reklamowy 200x100cm',
    category: 'banery',
    width: 2000,
    height: 1000,
    price: 150.00,
    description: 'Baner reklamowy 200x100cm - outdoor',
  },
  {
    id: 'baner-reklam-300x100',
    name: 'Baner reklamowy 300x100cm',
    category: 'banery',
    width: 3000,
    height: 1000,
    price: 200.00,
    description: 'Baner reklamowy 300x100cm - duży format',
  },
  {
    id: 'baner-reklam-400x100',
    name: 'Baner reklamowy 400x100cm',
    category: 'banery',
    width: 4000,
    height: 1000,
    price: 250.00,
    description: 'Baner reklamowy 400x100cm - ekstra duży',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(p => p.category === category);
};

// Tylko wizytówki i banery - fokus na tych produktach
export const CATEGORIES = [
  { id: 'wizytowki', name: 'Wizytówki', icon: '💼', description: '24 profesjonalne szablony do wyboru' },
  { id: 'banery', name: 'Banery', icon: '🎯', description: '9 szablonów roll-up i reklamowych' },
];

// Konwersja mm na piksele (300 DPI dla druku)
export const mmToPixels = (mm: number, dpi: number = 300): number => {
  return Math.round((mm / 25.4) * dpi);
};

// Konwersja pikseli na mm
export const pixelsToMm = (pixels: number, dpi: number = 300): number => {
  return (pixels * 25.4) / dpi;
};
