import { User, Phone, Mail, MapPin, Globe, Briefcase } from 'lucide-react';
import { fabric } from 'fabric';
import { useEditorStore } from '@/utils/store';

interface QuickAddButton {
  icon: any;
  label: string;
  placeholder: string;
  fontSize: number;
  fontWeight: number | string;
  color: string;
}

export const QuickAddPanel: React.FC = () => {
  const { canvas, currentProduct } = useEditorStore();

  const businessCardBlocks: QuickAddButton[] = [
    { icon: User, label: 'Imię i nazwisko', placeholder: 'Jan Kowalski', fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
    { icon: Briefcase, label: 'Stanowisko', placeholder: 'Dyrektor sprzedaży', fontSize: 14, fontWeight: 'normal', color: '#666666' },
    { icon: Phone, label: 'Telefon', placeholder: '+48 123 456 789', fontSize: 12, fontWeight: 'normal', color: '#333333' },
    { icon: Mail, label: 'E-mail', placeholder: 'jan.kowalski@firma.pl', fontSize: 12, fontWeight: 'normal', color: '#333333' },
    { icon: Globe, label: 'Strona www', placeholder: 'www.firma.pl', fontSize: 12, fontWeight: 'normal', color: '#0066cc' },
    { icon: MapPin, label: 'Adres', placeholder: 'ul. Przykładowa 123, Warszawa', fontSize: 10, fontWeight: 'normal', color: '#666666' },
  ];

  const bannerBlocks: QuickAddButton[] = [
    { icon: User, label: 'Nagłówek główny', placeholder: 'TWÓJ NAGŁÓWEK', fontSize: 80, fontWeight: 'bold', color: '#1a1a1a' },
    { icon: Briefcase, label: 'Podtytuł', placeholder: 'Opis lub hasło reklamowe', fontSize: 40, fontWeight: 'normal', color: '#666666' },
    { icon: Phone, label: 'Telefon kontaktowy', placeholder: 'Tel: +48 123 456 789', fontSize: 32, fontWeight: 'bold', color: '#0066cc' },
    { icon: Globe, label: 'Strona www', placeholder: 'www.twoja-firma.pl', fontSize: 28, fontWeight: 'normal', color: '#0066cc' },
  ];

  const blocks = currentProduct?.category === 'wizytowki' ? businessCardBlocks : bannerBlocks;

  const addTextBlock = (block: QuickAddButton) => {
    if (!canvas) return;

    // Losowa pozycja w bezpiecznej strefie canvas (unikaj nakładania)
    const margin = 100;
    const maxLeft = (canvas.width || 800) - margin - 300; // Rezerwujemy 300px na szerokość tekstu
    const maxTop = (canvas.height || 600) - margin - 100; // Rezerwujemy 100px na wysokość tekstu

    const randomLeft = Math.random() * (maxLeft - margin) + margin;
    const randomTop = Math.random() * (maxTop - margin) + margin;

    const text = new fabric.IText(block.placeholder, {
      left: randomLeft,
      top: randomTop,
      fontFamily: 'Arial',
      fontSize: block.fontSize,
      fontWeight: block.fontWeight,
      fill: block.color,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    // Zaznacz tekst aby użytkownik mógł od razu pisać
    text.enterEditing();
    text.selectAll();
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">Szybkie dodawanie</h3>
      <div className="grid grid-cols-2 gap-2">
        {blocks.map((block) => {
          const Icon = block.icon;
          return (
            <button
              key={block.label}
              onClick={() => addTextBlock(block)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors text-left border border-gray-200"
              title={`Dodaj pole: ${block.label}`}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="text-xs truncate">{block.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
