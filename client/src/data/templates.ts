import { Template } from '@/types';

// Szablony wizytówek
export const BUSINESS_CARD_TEMPLATES: Template[] = [
  {
    id: 'bc-modern-blue',
    name: 'Modern Blue',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/bc-modern-blue.png',
    tags: ['nowoczesny', 'niebieski', 'profesjonalny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło niebieskie
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#1e3a8a',
          selectable: false,
        },
        // Białe paski dekoracyjne
        {
          type: 'rect',
          left: 0,
          top: 500,
          width: 1004,
          height: 150,
          fill: '#ffffff',
          selectable: false,
        },
        // Nazwa
        {
          type: 'i-text',
          left: 120,
          top: 150,
          text: 'Jan Kowalski',
          fontSize: 56,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Stanowisko
        {
          type: 'i-text',
          left: 120,
          top: 230,
          text: 'Dyrektor Sprzedaży',
          fontSize: 28,
          fill: '#93c5fd',
          fontFamily: 'Arial',
        },
        // Telefon
        {
          type: 'i-text',
          left: 120,
          top: 520,
          text: '+48 123 456 789',
          fontSize: 22,
          fill: '#1e3a8a',
          fontFamily: 'Arial',
        },
        // Email
        {
          type: 'i-text',
          left: 120,
          top: 560,
          text: 'jan.kowalski@firma.pl',
          fontSize: 22,
          fill: '#1e3a8a',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'bc-elegant-gold',
    name: 'Elegant Gold',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/bc-elegant-gold.png',
    tags: ['elegancki', 'złoty', 'luksusowy'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło czarne
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#000000',
          selectable: false,
        },
        // Złoty akcent
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 20,
          height: 650,
          fill: '#fbbf24',
          selectable: false,
        },
        // Nazwa
        {
          type: 'i-text',
          left: 100,
          top: 200,
          text: 'Anna Nowak',
          fontSize: 52,
          fontWeight: 'bold',
          fill: '#fbbf24',
          fontFamily: 'Arial',
        },
        // Stanowisko
        {
          type: 'i-text',
          left: 100,
          top: 270,
          text: 'CEO & Founder',
          fontSize: 24,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
        // Linia
        {
          type: 'line',
          left: 100,
          top: 330,
          x1: 0,
          y1: 0,
          x2: 300,
          y2: 0,
          stroke: '#fbbf24',
          strokeWidth: 2,
        },
        // Telefon
        {
          type: 'i-text',
          left: 100,
          top: 380,
          text: '+48 987 654 321',
          fontSize: 20,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Email
        {
          type: 'i-text',
          left: 100,
          top: 420,
          text: 'anna.nowak@firma.pl',
          fontSize: 20,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'bc-minimal-white',
    name: 'Minimal White',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/bc-minimal-white.png',
    tags: ['minimalistyczny', 'biały', 'czysty'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło białe
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#ffffff',
          selectable: false,
        },
        // Nazwa
        {
          type: 'i-text',
          left: 120,
          top: 180,
          text: 'Piotr Wiśniewski',
          fontSize: 48,
          fontWeight: 'bold',
          fill: '#111827',
          fontFamily: 'Arial',
        },
        // Stanowisko
        {
          type: 'i-text',
          left: 120,
          top: 250,
          text: 'Marketing Manager',
          fontSize: 22,
          fill: '#6b7280',
          fontFamily: 'Arial',
        },
        // Delikatna linia
        {
          type: 'rect',
          left: 120,
          top: 300,
          width: 60,
          height: 3,
          fill: '#3b82f6',
        },
        // Telefon
        {
          type: 'i-text',
          left: 120,
          top: 380,
          text: 'T: +48 555 123 456',
          fontSize: 18,
          fill: '#374151',
          fontFamily: 'Arial',
        },
        // Email
        {
          type: 'i-text',
          left: 120,
          top: 420,
          text: 'E: piotr.w@firma.pl',
          fontSize: 18,
          fill: '#374151',
          fontFamily: 'Arial',
        },
        // Website
        {
          type: 'i-text',
          left: 120,
          top: 460,
          text: 'W: www.firma.pl',
          fontSize: 18,
          fill: '#374151',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'bc-creative-purple',
    name: 'Creative Purple',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/bc-creative-purple.png',
    tags: ['kreatywny', 'fioletowy', 'nowoczesny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Gradient background (symulowany dwoma prostokątami)
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#7c3aed',
          selectable: false,
        },
        {
          type: 'circle',
          left: 600,
          top: -100,
          radius: 300,
          fill: '#a78bfa',
          opacity: 0.3,
          selectable: false,
        },
        // Nazwa
        {
          type: 'i-text',
          left: 100,
          top: 220,
          text: 'Maria Kowalczyk',
          fontSize: 50,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Stanowisko
        {
          type: 'i-text',
          left: 100,
          top: 290,
          text: 'Creative Director',
          fontSize: 26,
          fill: '#e9d5ff',
          fontFamily: 'Arial',
        },
        // Kontakt box
        {
          type: 'rect',
          left: 100,
          top: 380,
          width: 350,
          height: 120,
          fill: 'rgba(255,255,255,0.2)',
          rx: 10,
          ry: 10,
        },
        // Telefon
        {
          type: 'i-text',
          left: 120,
          top: 400,
          text: '+48 777 888 999',
          fontSize: 20,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Email
        {
          type: 'i-text',
          left: 120,
          top: 440,
          text: 'maria.k@kreacja.pl',
          fontSize: 20,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'bc-corporate-gray',
    name: 'Corporate Gray',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/bc-corporate-gray.png',
    tags: ['korporacyjny', 'szary', 'profesjonalny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło szare
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#1f2937',
          selectable: false,
        },
        // Górny pasek
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 80,
          fill: '#111827',
          selectable: false,
        },
        // Nazwa
        {
          type: 'i-text',
          left: 100,
          top: 150,
          text: 'Tomasz Lewandowski',
          fontSize: 46,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Stanowisko
        {
          type: 'i-text',
          left: 100,
          top: 210,
          text: 'Senior Consultant',
          fontSize: 24,
          fill: '#9ca3af',
          fontFamily: 'Arial',
        },
        // Biały pasek
        {
          type: 'rect',
          left: 100,
          top: 260,
          width: 100,
          height: 4,
          fill: '#3b82f6',
        },
        // Kontakt
        {
          type: 'i-text',
          left: 100,
          top: 320,
          text: 'M: +48 600 700 800',
          fontSize: 20,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 360,
          text: 'E: tomasz.l@corp.pl',
          fontSize: 20,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 400,
          text: 'W: www.corporation.pl',
          fontSize: 20,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'bc-tech-green',
    name: 'Tech Green',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/bc-tech-green.png',
    tags: ['technologiczny', 'zielony', 'nowoczesny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło ciemnozielone
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1004,
          height: 650,
          fill: '#064e3b',
          selectable: false,
        },
        // Okręgi dekoracyjne
        {
          type: 'circle',
          left: 700,
          top: 100,
          radius: 100,
          fill: '#10b981',
          opacity: 0.2,
          selectable: false,
        },
        {
          type: 'circle',
          left: 800,
          top: 400,
          radius: 60,
          fill: '#34d399',
          opacity: 0.3,
          selectable: false,
        },
        // Nazwa
        {
          type: 'i-text',
          left: 80,
          top: 180,
          text: 'Karolina Tech',
          fontSize: 52,
          fontWeight: 'bold',
          fill: '#10b981',
          fontFamily: 'Arial',
        },
        // Stanowisko
        {
          type: 'i-text',
          left: 80,
          top: 250,
          text: 'Software Engineer',
          fontSize: 26,
          fill: '#6ee7b7',
          fontFamily: 'Arial',
        },
        // Kontakt
        {
          type: 'i-text',
          left: 80,
          top: 350,
          text: '📱 +48 111 222 333',
          fontSize: 20,
          fill: '#d1fae5',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 80,
          top: 390,
          text: '✉️ karolina@techfirm.io',
          fontSize: 20,
          fill: '#d1fae5',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 80,
          top: 430,
          text: '🌐 techfirm.io',
          fontSize: 20,
          fill: '#d1fae5',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
];

// Szablony banerów
export const BANNER_TEMPLATES: Template[] = [
  {
    id: 'banner-promo-red',
    name: 'Promocja - Czerwony',
    productId: 'baner-rollup-100x200',
    category: 'banery',
    thumbnail: '/templates/banner-promo-red.png',
    tags: ['promocja', 'czerwony', 'wyprzedaż'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło czerwone
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1181,
          height: 2362,
          fill: '#dc2626',
          selectable: false,
        },
        // Górny pasek
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1181,
          height: 300,
          fill: '#991b1b',
          selectable: false,
        },
        // Główny nagłówek
        {
          type: 'i-text',
          left: 100,
          top: 500,
          text: 'MEGA',
          fontSize: 180,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 700,
          text: 'WYPRZEDAŻ',
          fontSize: 180,
          fontWeight: 'bold',
          fill: '#fef08a',
          fontFamily: 'Arial',
        },
        // Rabat
        {
          type: 'i-text',
          left: 150,
          top: 1000,
          text: '-50%',
          fontSize: 280,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
          stroke: '#fef08a',
          strokeWidth: 8,
        },
        // Opis
        {
          type: 'i-text',
          left: 100,
          top: 1400,
          text: 'na wybrane produkty',
          fontSize: 70,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Telefon
        {
          type: 'i-text',
          left: 100,
          top: 1900,
          text: 'Tel: 123 456 789',
          fontSize: 60,
          fontWeight: 'bold',
          fill: '#fef08a',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'banner-event-blue',
    name: 'Event - Niebieski',
    productId: 'baner-rollup-100x200',
    category: 'banery',
    thumbnail: '/templates/banner-event-blue.png',
    tags: ['event', 'niebieski', 'konferencja'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło niebieskie
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1181,
          height: 2362,
          fill: '#1e40af',
          selectable: false,
        },
        // Dekoracyjne koła
        {
          type: 'circle',
          left: 800,
          top: 200,
          radius: 200,
          fill: '#3b82f6',
          opacity: 0.3,
          selectable: false,
        },
        // Nagłówek
        {
          type: 'i-text',
          left: 100,
          top: 400,
          text: 'KONFERENCJA',
          fontSize: 100,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 530,
          text: '2025',
          fontSize: 100,
          fontWeight: 'bold',
          fill: '#60a5fa',
          fontFamily: 'Arial',
        },
        // Temat
        {
          type: 'i-text',
          left: 100,
          top: 750,
          text: 'Innowacje w',
          fontSize: 80,
          fill: '#dbeafe',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 850,
          text: 'Technologii',
          fontSize: 80,
          fill: '#dbeafe',
          fontFamily: 'Arial',
        },
        // Data
        {
          type: 'rect',
          left: 100,
          top: 1100,
          width: 900,
          height: 150,
          fill: '#ffffff',
          rx: 20,
          ry: 20,
        },
        {
          type: 'i-text',
          left: 150,
          top: 1135,
          text: '📅 15-17 Marca 2025',
          fontSize: 60,
          fill: '#1e40af',
          fontFamily: 'Arial',
          fontWeight: 'bold',
        },
        // Lokalizacja
        {
          type: 'i-text',
          left: 100,
          top: 1350,
          text: '📍 Warszawa, Polska',
          fontSize: 55,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Strona
        {
          type: 'i-text',
          left: 100,
          top: 1900,
          text: 'www.konferencja2025.pl',
          fontSize: 65,
          fontWeight: 'bold',
          fill: '#fbbf24',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
  {
    id: 'banner-business-black',
    name: 'Business - Czarny',
    productId: 'baner-rollup-100x200',
    category: 'banery',
    thumbnail: '/templates/banner-business-black.png',
    tags: ['biznes', 'czarny', 'elegancki'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Tło czarne
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1181,
          height: 2362,
          fill: '#000000',
          selectable: false,
        },
        // Złoty akcent
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 40,
          height: 2362,
          fill: '#fbbf24',
          selectable: false,
        },
        // Logo placeholder
        {
          type: 'circle',
          left: 400,
          top: 300,
          radius: 120,
          fill: '#fbbf24',
        },
        // Nazwa firmy
        {
          type: 'i-text',
          left: 100,
          top: 600,
          text: 'TWOJA FIRMA',
          fontSize: 90,
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        // Tagline
        {
          type: 'i-text',
          left: 100,
          top: 720,
          text: 'Profesjonalne rozwiązania',
          fontSize: 55,
          fill: '#fbbf24',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 800,
          text: 'dla Twojego biznesu',
          fontSize: 55,
          fill: '#fbbf24',
          fontFamily: 'Arial',
        },
        // Linia
        {
          type: 'rect',
          left: 100,
          top: 920,
          width: 800,
          height: 4,
          fill: '#fbbf24',
        },
        // Usługi
        {
          type: 'i-text',
          left: 100,
          top: 1050,
          text: '✓ Doradztwo biznesowe',
          fontSize: 50,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 1150,
          text: '✓ Optymalizacja procesów',
          fontSize: 50,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 1250,
          text: '✓ Szkolenia dla firm',
          fontSize: 50,
          fill: '#d1d5db',
          fontFamily: 'Arial',
        },
        // Kontakt
        {
          type: 'i-text',
          left: 100,
          top: 1800,
          text: '📞 +48 123 456 789',
          fontSize: 55,
          fill: '#ffffff',
          fontFamily: 'Arial',
        },
        {
          type: 'i-text',
          left: 100,
          top: 1900,
          text: '🌐 www.twojafirma.pl',
          fontSize: 55,
          fill: '#fbbf24',
          fontFamily: 'Arial',
        },
      ],
    }),
  },
];

export const ALL_TEMPLATES = [...BUSINESS_CARD_TEMPLATES, ...BANNER_TEMPLATES];

export const getTemplatesByCategory = (category: string): Template[] => {
  return ALL_TEMPLATES.filter(t => t.category === category);
};

export const getTemplateById = (id: string): Template | undefined => {
  return ALL_TEMPLATES.find(t => t.id === id);
};
