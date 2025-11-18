import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

const TIPS = [
  'Pamiętaj: ważne elementy powinny znajdować się wewnątrz zielonej strefy bezpiecznej! 📐',
  'Wciśnij Delete lub Backspace, aby usunąć zaznaczony element 🗑️',
  'Użyj Ctrl+Z aby cofnąć, Ctrl+Y aby ponowić działanie ↩️',
  'Przeciągaj elementy myszką, aby zmienić ich pozycję 🖱️',
  'Kliknij dwukrotnie na tekst, aby go edytować ✏️',
  'Dla najlepszej jakości druku używaj obrazów min. 300 DPI 🖼️',
  'Czerwone strefy to spady - tło powinno sięgać do krawędzi 🔴',
  'Użyj "Szybkie dodawanie" aby łatwo dodać typowe elementy ⚡',
  'Autosave zapisuje twoją pracę co 30 sekund automatycznie 💾',
  'Możesz zmieniać kolory, czcionki i rozmiary w panelu właściwości 🎨',
  'Dodaj logo lub obraz przez przycisk "Obraz" w narzędziach 📷',
  'Siatka pomaga w wyrównaniu elementów - włącz ją w górnym menu! 📏',
];

export const HelpfulTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Rotuj tipy co 15 sekund
  useEffect(() => {
    if (!isMinimized && isVisible) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % TIPS.length);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [isMinimized, isVisible]);

  // Sprawdź czy użytkownik zamknął tipy
  useEffect(() => {
    const dismissed = localStorage.getItem('tipsDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('tipsDismissed', 'true');
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <button
        onClick={handleToggleMinimize}
        className="fixed bottom-6 left-6 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all z-40 animate-bounce"
        title="Pokaż pomocne wskazówki"
      >
        <Lightbulb size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 max-w-md z-40 animate-scale-in">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 bg-yellow-400 text-white p-2 rounded-full">
          <Lightbulb size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
            <span>💡 Pomocna wskazówka</span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleMinimize}
                className="text-gray-500 hover:text-gray-700 transition-colors text-xs px-2 py-1 hover:bg-gray-200 rounded"
                title="Minimalizuj"
              >
                Minimalizuj
              </button>
              <button
                onClick={handleDismiss}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                title="Zamknij na stałe"
              >
                <X size={16} />
              </button>
            </div>
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {TIPS[currentTip]}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1">
              {TIPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentTip
                      ? 'w-6 bg-yellow-500'
                      : 'w-1.5 bg-yellow-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500">
              {currentTip + 1} / {TIPS.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
