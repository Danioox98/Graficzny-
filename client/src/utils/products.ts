import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // Wizytówki
  {
    id: 'wiz-85x55',
    name: 'Wizytówka standardowa',
    category: 'wizytowki',
    width: 85,
    height: 55,
    price: 0.50,
    description: 'Standardowa wizytówka 85x55mm',
  },
  {
    id: 'wiz-90x50',
    name: 'Wizytówka panorama',
    category: 'wizytowki',
    width: 90,
    height: 50,
    price: 0.60,
    description: 'Wizytówka panoramiczna 90x50mm',
  },

  // Ulotki
  {
    id: 'ulotka-a6',
    name: 'Ulotka A6',
    category: 'ulotki',
    width: 105,
    height: 148,
    price: 0.80,
    description: 'Ulotka A6 (105x148mm)',
  },
  {
    id: 'ulotka-a5',
    name: 'Ulotka A5',
    category: 'ulotki',
    width: 148,
    height: 210,
    price: 1.20,
    description: 'Ulotka A5 (148x210mm)',
  },
  {
    id: 'ulotka-a4',
    name: 'Ulotka A4',
    category: 'ulotki',
    width: 210,
    height: 297,
    price: 2.00,
    description: 'Ulotka A4 (210x297mm)',
  },
  {
    id: 'ulotka-dl',
    name: 'Ulotka DL',
    category: 'ulotki',
    width: 99,
    height: 210,
    price: 0.90,
    description: 'Ulotka DL (99x210mm)',
  },

  // Plakaty
  {
    id: 'plakat-a3',
    name: 'Plakat A3',
    category: 'plakaty',
    width: 297,
    height: 420,
    price: 8.00,
    description: 'Plakat A3 (297x420mm)',
  },
  {
    id: 'plakat-a2',
    name: 'Plakat A2',
    category: 'plakaty',
    width: 420,
    height: 594,
    price: 15.00,
    description: 'Plakat A2 (420x594mm)',
  },
  {
    id: 'plakat-a1',
    name: 'Plakat A1',
    category: 'plakaty',
    width: 594,
    height: 841,
    price: 25.00,
    description: 'Plakat A1 (594x841mm)',
  },
  {
    id: 'plakat-a0',
    name: 'Plakat A0',
    category: 'plakaty',
    width: 841,
    height: 1189,
    price: 45.00,
    description: 'Plakat A0 (841x1189mm)',
  },

  // Banery
  {
    id: 'baner-100x200',
    name: 'Baner Roll-up',
    category: 'banery',
    width: 1000,
    height: 2000,
    price: 120.00,
    description: 'Baner Roll-up 100x200cm',
  },
  {
    id: 'baner-200x100',
    name: 'Baner reklamowy',
    category: 'banery',
    width: 2000,
    height: 1000,
    price: 150.00,
    description: 'Baner reklamowy 200x100cm',
  },

  // Naklejki
  {
    id: 'naklejka-okragla-50',
    name: 'Naklejka okrągła Ø50mm',
    category: 'naklejki',
    width: 50,
    height: 50,
    price: 0.30,
    description: 'Naklejka okrągła średnica 50mm',
  },
  {
    id: 'naklejka-prostokat-70x50',
    name: 'Naklejka prostokątna 70x50mm',
    category: 'naklejki',
    width: 70,
    height: 50,
    price: 0.35,
    description: 'Naklejka prostokątna 70x50mm',
  },

  // Zaproszenia
  {
    id: 'zaproszenie-a5',
    name: 'Zaproszenie A5',
    category: 'zaproszenia',
    width: 148,
    height: 210,
    price: 3.50,
    description: 'Zaproszenie A5 (148x210mm)',
  },
  {
    id: 'zaproszenie-square',
    name: 'Zaproszenie kwadratowe',
    category: 'zaproszenia',
    width: 150,
    height: 150,
    price: 4.00,
    description: 'Zaproszenie kwadratowe 150x150mm',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(p => p.category === category);
};

export const CATEGORIES = [
  { id: 'wizytowki', name: 'Wizytówki', icon: '💼' },
  { id: 'ulotki', name: 'Ulotki', icon: '📄' },
  { id: 'plakaty', name: 'Plakaty', icon: '🖼️' },
  { id: 'banery', name: 'Banery', icon: '🎯' },
  { id: 'naklejki', name: 'Naklejki', icon: '🏷️' },
  { id: 'zaproszenia', name: 'Zaproszenia', icon: '💌' },
];

// Konwersja mm na piksele (300 DPI dla druku)
export const mmToPixels = (mm: number, dpi: number = 300): number => {
  return Math.round((mm / 25.4) * dpi);
};

// Konwersja pikseli na mm
export const pixelsToMm = (pixels: number, dpi: number = 300): number => {
  return (pixels * 25.4) / dpi;
};
