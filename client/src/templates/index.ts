import { Template } from '@/types';

// Gotowe szablony dla różnych produktów
export const TEMPLATES: Template[] = [
  // Wizytówki
  {
    id: 'wiz-biznes-1',
    name: 'Wizytówka Biznesowa - Elegancka',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-biznes-1.png',
    tags: ['biznes', 'elegancki', 'minimalistyczny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#1a1a2e',
        },
        {
          type: 'text',
          left: 50,
          top: 50,
          text: 'Jan Kowalski',
          fontFamily: 'Arial',
          fontSize: 48,
          fill: '#ffffff',
          fontWeight: 'bold',
        },
        {
          type: 'text',
          left: 50,
          top: 120,
          text: 'Specjalista ds. Marketingu',
          fontFamily: 'Arial',
          fontSize: 24,
          fill: '#f39c12',
        },
        {
          type: 'text',
          left: 50,
          top: 480,
          text: 'Tel: +48 123 456 789',
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#ecf0f1',
        },
        {
          type: 'text',
          left: 50,
          top: 520,
          text: 'email@firma.pl',
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#ecf0f1',
        },
        {
          type: 'text',
          left: 50,
          top: 560,
          text: 'www.firma.pl',
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#ecf0f1',
        },
      ],
    }),
  },
  {
    id: 'wiz-nowoczesna-1',
    name: 'Wizytówka Nowoczesna - Gradient',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-nowoczesna-1.png',
    tags: ['nowoczesny', 'kolorowy', 'gradient'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          type: 'text',
          left: 50,
          top: 250,
          text: 'Twoje Imię',
          fontFamily: 'Arial',
          fontSize: 52,
          fill: '#ffffff',
          fontWeight: 'bold',
        },
        {
          type: 'text',
          left: 50,
          top: 320,
          text: 'Twoje Stanowisko',
          fontFamily: 'Arial',
          fontSize: 28,
          fill: '#ffffff',
        },
      ],
    }),
  },

  // Ulotki
  {
    id: 'ulotka-promo-1',
    name: 'Ulotka Promocyjna - Restauracja',
    productId: 'ulotka-a5',
    category: 'ulotki',
    thumbnail: '/templates/ulotka-promo-1.png',
    tags: ['restauracja', 'promocja', 'żywność'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1748,
          height: 2480,
          fill: '#fff8e7',
        },
        {
          type: 'text',
          left: 100,
          top: 100,
          text: 'MENU RESTAURACJI',
          fontFamily: 'Arial',
          fontSize: 72,
          fill: '#c0392b',
          fontWeight: 'bold',
        },
        {
          type: 'text',
          left: 100,
          top: 220,
          text: '-20% NA WSZYSTKIE DANIA',
          fontFamily: 'Arial',
          fontSize: 48,
          fill: '#e74c3c',
        },
      ],
    }),
  },
  {
    id: 'ulotka-event-1',
    name: 'Ulotka Eventowa',
    productId: 'ulotka-a4',
    category: 'ulotki',
    thumbnail: '/templates/ulotka-event-1.png',
    tags: ['event', 'koncert', 'impreza'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 2480,
          height: 3508,
          fill: '#2c3e50',
        },
        {
          type: 'text',
          left: 100,
          top: 1500,
          text: 'WIELKI KONCERT',
          fontFamily: 'Arial',
          fontSize: 96,
          fill: '#f39c12',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      ],
    }),
  },

  // Plakaty
  {
    id: 'plakat-film-1',
    name: 'Plakat Filmowy',
    productId: 'plakat-a2',
    category: 'plakaty',
    thumbnail: '/templates/plakat-film-1.png',
    tags: ['film', 'kino', 'rozrywka'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 4961,
          height: 7016,
          fill: '#000000',
        },
        {
          type: 'text',
          left: 200,
          top: 5500,
          text: 'TYTUŁ FILMU',
          fontFamily: 'Arial',
          fontSize: 180,
          fill: '#ffffff',
          fontWeight: 'bold',
        },
      ],
    }),
  },

  // Banery
  {
    id: 'baner-rollup-1',
    name: 'Baner Roll-up Firmowy',
    productId: 'baner-100x200',
    category: 'banery',
    thumbnail: '/templates/baner-rollup-1.png',
    tags: ['firmowy', 'roll-up', 'prezentacja'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 11811,
          height: 23622,
          fill: 'linear-gradient(180deg, #3498db 0%, #2c3e50 100%)',
        },
        {
          type: 'text',
          left: 1000,
          top: 10000,
          text: 'TWOJA FIRMA',
          fontFamily: 'Arial',
          fontSize: 300,
          fill: '#ffffff',
          fontWeight: 'bold',
        },
      ],
    }),
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByProduct = (productId: string): Template[] => {
  return TEMPLATES.filter(t => t.productId === productId);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return TEMPLATES.filter(t => t.category === category);
};
