import { Template } from '@/types';

// Szablony wizytówek
export const businessCardTemplates: Template[] = [
  // BIZNESOWE
  {
    id: 'wiz-biznes-1',
    name: 'Elegancka Czerń',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-biznes-1.png',
    tags: ['biznes', 'elegancki', 'czarny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#1a1a2e' },
        { type: 'rect', left: 0, top: 0, width: 15, height: 650, fill: '#f39c12' },
        { type: 'text', left: 50, top: 60, text: 'JAN KOWALSKI', fontFamily: 'Arial', fontSize: 52, fill: '#ffffff', fontWeight: 'bold' },
        { type: 'text', left: 50, top: 130, text: 'Dyrektor Zarządzający', fontFamily: 'Arial', fontSize: 24, fill: '#f39c12' },
        { type: 'text', left: 50, top: 480, text: '+48 123 456 789', fontFamily: 'Arial', fontSize: 20, fill: '#ecf0f1' },
        { type: 'text', left: 50, top: 515, text: 'jan.kowalski@firma.pl', fontFamily: 'Arial', fontSize: 20, fill: '#ecf0f1' },
        { type: 'text', left: 50, top: 550, text: 'www.firma.pl', fontFamily: 'Arial', fontSize: 20, fill: '#ecf0f1' },
      ],
    }),
  },
  {
    id: 'wiz-biznes-2',
    name: 'Profesjonalna Biel',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-biznes-2.png',
    tags: ['biznes', 'minimalistyczny', 'biały'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#ffffff' },
        { type: 'rect', left: 0, top: 600, width: 1004, height: 50, fill: '#2c3e50' },
        { type: 'text', left: 60, top: 200, text: 'ANNA NOWAK', fontFamily: 'Arial', fontSize: 48, fill: '#2c3e50', fontWeight: 'bold' },
        { type: 'text', left: 60, top: 260, text: 'Architekt', fontFamily: 'Arial', fontSize: 28, fill: '#7f8c8d' },
        { type: 'text', left: 60, top: 380, text: 'T: +48 123 456 789', fontFamily: 'Arial', fontSize: 18, fill: '#2c3e50' },
        { type: 'text', left: 60, top: 410, text: 'E: anna@architektura.pl', fontFamily: 'Arial', fontSize: 18, fill: '#2c3e50' },
      ],
    }),
  },
  {
    id: 'wiz-biznes-3',
    name: 'Niebieski Korporacyjny',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-biznes-3.png',
    tags: ['biznes', 'korporacyjny', 'niebieski'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#ecf0f1' },
        { type: 'rect', left: 0, top: 0, width: 1004, height: 200, fill: '#3498db' },
        { type: 'text', left: 50, top: 60, text: 'MAREK WIŚNIEWSKI', fontFamily: 'Arial', fontSize: 44, fill: '#ffffff', fontWeight: 'bold' },
        { type: 'text', left: 50, top: 120, text: 'Konsultant Biznesowy', fontFamily: 'Arial', fontSize: 24, fill: '#ffffff' },
        { type: 'text', left: 50, top: 280, text: 'Telefon: +48 123 456 789', fontFamily: 'Arial', fontSize: 20, fill: '#2c3e50' },
        { type: 'text', left: 50, top: 320, text: 'Email: marek@consulting.pl', fontFamily: 'Arial', fontSize: 20, fill: '#2c3e50' },
        { type: 'text', left: 50, top: 360, text: 'Web: www.consulting.pl', fontFamily: 'Arial', fontSize: 20, fill: '#2c3e50' },
      ],
    }),
  },

  // KREATYWNE
  {
    id: 'wiz-kreatywna-1',
    name: 'Gradient Fiolet-Róż',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-kreatywna-1.png',
    tags: ['kreatywny', 'kolorowy', 'gradient'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#667eea' },
        { type: 'rect', left: 600, top: 0, width: 404, height: 650, fill: '#f093fb', opacity: 0.7 },
        { type: 'text', left: 50, top: 250, text: 'MARIA KOWALCZYK', fontFamily: 'Arial', fontSize: 46, fill: '#ffffff', fontWeight: 'bold' },
        { type: 'text', left: 50, top: 310, text: 'Grafik & Projektant', fontFamily: 'Arial', fontSize: 28, fill: '#ffffff' },
        { type: 'text', left: 50, top: 480, text: '📱 +48 123 456 789', fontFamily: 'Arial', fontSize: 20, fill: '#ffffff' },
        { type: 'text', left: 50, top: 520, text: '✉️ maria@creative.pl', fontFamily: 'Arial', fontSize: 20, fill: '#ffffff' },
      ],
    }),
  },
  {
    id: 'wiz-kreatywna-2',
    name: 'Kolorowe Kształty',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-kreatywna-2.png',
    tags: ['kreatywny', 'kolorowy', 'geometryczny'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#ffffff' },
        { type: 'circle', left: 700, top: -50, radius: 150, fill: '#e74c3c', opacity: 0.3 },
        { type: 'circle', left: 50, top: 400, radius: 100, fill: '#3498db', opacity: 0.3 },
        { type: 'triangle', left: 800, top: 450, width: 150, height: 150, fill: '#f39c12', opacity: 0.3 },
        { type: 'text', left: 50, top: 180, text: 'PIOTR ZIELIŃSKI', fontFamily: 'Arial', fontSize: 48, fill: '#2c3e50', fontWeight: 'bold' },
        { type: 'text', left: 50, top: 245, text: 'Creative Director', fontFamily: 'Arial', fontSize: 26, fill: '#e74c3c' },
        { type: 'text', left: 50, top: 340, text: '+48 123 456 789', fontFamily: 'Arial', fontSize: 20, fill: '#7f8c8d' },
        { type: 'text', left: 50, top: 375, text: 'piotr@studio.pl', fontFamily: 'Arial', fontSize: 20, fill: '#7f8c8d' },
      ],
    }),
  },
  {
    id: 'wiz-kreatywna-3',
    name: 'Złoty Luksus',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-kreatywna-3.png',
    tags: ['kreatywny', 'luksusowy', 'złoty'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#2c2c2c' },
        { type: 'rect', left: 0, top: 300, width: 1004, height: 4, fill: '#d4af37' },
        { type: 'text', left: 502, top: 150, text: 'JULIA LEWANDOWSKA', fontFamily: 'Arial', fontSize: 42, fill: '#d4af37', fontWeight: 'bold', textAlign: 'center' },
        { type: 'text', left: 502, top: 210, text: 'CEO & Founder', fontFamily: 'Arial', fontSize: 26, fill: '#ffffff', textAlign: 'center' },
        { type: 'text', left: 502, top: 400, text: '+48 123 456 789  |  julia@luxury.pl', fontFamily: 'Arial', fontSize: 20, fill: '#d4af37', textAlign: 'center' },
      ],
    }),
  },

  // MINIMALISTYCZNE
  {
    id: 'wiz-minimal-1',
    name: 'Czarno-Biały Minimal',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-minimal-1.png',
    tags: ['minimalistyczny', 'czarno-biały', 'prosty'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#ffffff' },
        { type: 'rect', left: 0, top: 325, width: 1004, height: 2, fill: '#000000' },
        { type: 'text', left: 60, top: 250, text: 'TOMASZ KRÓL', fontFamily: 'Arial', fontSize: 42, fill: '#000000', fontWeight: 'bold' },
        { type: 'text', left: 60, top: 360, text: 'Designer', fontFamily: 'Arial', fontSize: 22, fill: '#000000' },
        { type: 'text', left: 60, top: 500, text: '+48 123 456 789', fontFamily: 'Arial', fontSize: 18, fill: '#000000' },
        { type: 'text', left: 60, top: 530, text: 'tomasz@design.pl', fontFamily: 'Arial', fontSize: 18, fill: '#000000' },
      ],
    }),
  },
  {
    id: 'wiz-minimal-2',
    name: 'Jednolita Biel',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-minimal-2.png',
    tags: ['minimalistyczny', 'biały', 'czysty'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#fafafa' },
        { type: 'text', left: 60, top: 60, text: 'KATARZYNA', fontFamily: 'Arial', fontSize: 38, fill: '#333333' },
        { type: 'text', left: 60, top: 105, text: 'NOWACKA', fontFamily: 'Arial', fontSize: 38, fill: '#333333', fontWeight: 'bold' },
        { type: 'text', left: 60, top: 180, text: 'Photographer', fontFamily: 'Arial', fontSize: 20, fill: '#999999' },
        { type: 'text', left: 60, top: 550, text: 'k.nowacka@photo.pl  •  +48 123 456 789', fontFamily: 'Arial', fontSize: 16, fill: '#666666' },
      ],
    }),
  },
  {
    id: 'wiz-minimal-3',
    name: 'Typograficzny',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-minimal-3.png',
    tags: ['minimalistyczny', 'typografia', 'prosty'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#ffffff' },
        { type: 'text', left: 502, top: 200, text: 'ADAM', fontFamily: 'Arial', fontSize: 80, fill: '#000000', fontWeight: 'bold', textAlign: 'center' },
        { type: 'text', left: 502, top: 290, text: 'KOWALSKI', fontFamily: 'Arial', fontSize: 32, fill: '#666666', textAlign: 'center' },
        { type: 'text', left: 502, top: 450, text: '+48 123 456 789', fontFamily: 'Arial', fontSize: 18, fill: '#000000', textAlign: 'center' },
        { type: 'text', left: 502, top: 480, text: 'adam@studio.pl', fontFamily: 'Arial', fontSize: 18, fill: '#000000', textAlign: 'center' },
      ],
    }),
  },

  // BRANŻOWE
  {
    id: 'wiz-tech-1',
    name: 'Tech & IT',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-tech-1.png',
    tags: ['tech', 'IT', 'cyfrowy'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#0a0e27' },
        { type: 'rect', left: 0, top: 0, width: 20, height: 650, fill: '#00ff88' },
        { type: 'text', left: 60, top: 60, text: 'MICHAŁ TECH', fontFamily: 'Courier New', fontSize: 42, fill: '#00ff88', fontWeight: 'bold' },
        { type: 'text', left: 60, top: 120, text: '< Full Stack Developer />', fontFamily: 'Courier New', fontSize: 22, fill: '#ffffff' },
        { type: 'text', left: 60, top: 480, text: '$ michal@dev.pl', fontFamily: 'Courier New', fontSize: 18, fill: '#00ff88' },
        { type: 'text', left: 60, top: 515, text: '$ +48 123 456 789', fontFamily: 'Courier New', fontSize: 18, fill: '#00ff88' },
        { type: 'text', left: 60, top: 550, text: '$ github.com/michaltech', fontFamily: 'Courier New', fontSize: 18, fill: '#00ff88' },
      ],
    }),
  },
  {
    id: 'wiz-med-1',
    name: 'Medyczny - Zdrowie',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-med-1.png',
    tags: ['medyczny', 'zdrowie', 'lekarz'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#ffffff' },
        { type: 'rect', left: 0, top: 0, width: 1004, height: 15, fill: '#27ae60' },
        { type: 'text', left: 60, top: 180, text: 'dr ANNA ZDROWA', fontFamily: 'Arial', fontSize: 44, fill: '#2c3e50', fontWeight: 'bold' },
        { type: 'text', left: 60, top: 240, text: 'Lekarz Rodzinny', fontFamily: 'Arial', fontSize: 26, fill: '#27ae60' },
        { type: 'text', left: 60, top: 400, text: 'Tel: +48 123 456 789', fontFamily: 'Arial', fontSize: 20, fill: '#7f8c8d' },
        { type: 'text', left: 60, top: 435, text: 'Email: dr.anna@przychodnia.pl', fontFamily: 'Arial', fontSize: 20, fill: '#7f8c8d' },
        { type: 'text', left: 60, top: 470, text: 'ul. Zdrowia 1, Warszawa', fontFamily: 'Arial', fontSize: 20, fill: '#7f8c8d' },
      ],
    }),
  },
  {
    id: 'wiz-law-1',
    name: 'Prawniczy - Kancelaria',
    productId: 'wiz-85x55',
    category: 'wizytowki',
    thumbnail: '/templates/wiz-law-1.png',
    tags: ['prawniczy', 'kancelaria', 'adwokat'],
    data: JSON.stringify({
      version: '5.3.0',
      objects: [
        { type: 'rect', left: 0, top: 0, width: 1004, height: 650, fill: '#1c2833' },
        { type: 'rect', left: 480, top: 0, width: 6, height: 650, fill: '#c0a062' },
        { type: 'text', left: 60, top: 200, text: 'PIOTR SPRAWIEDLIWY', fontFamily: 'Georgia', fontSize: 38, fill: '#c0a062', fontWeight: 'bold' },
        { type: 'text', left: 60, top: 250, text: 'Radca Prawny', fontFamily: 'Georgia', fontSize: 24, fill: '#ecf0f1' },
        { type: 'text', left: 60, top: 450, text: 'Kancelaria Prawna "Sprawiedliwość"', fontFamily: 'Georgia', fontSize: 18, fill: '#bdc3c7' },
        { type: 'text', left: 60, top: 485, text: 'Tel: +48 123 456 789', fontFamily: 'Georgia', fontSize: 18, fill: '#bdc3c7' },
        { type: 'text', left: 60, top: 520, text: 'Email: piotr@kancelaria.pl', fontFamily: 'Georgia', fontSize: 18, fill: '#bdc3c7' },
      ],
    }),
  },
];
