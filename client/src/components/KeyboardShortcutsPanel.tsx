import { X } from 'lucide-react';

interface KeyboardShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsPanel: React.FC<KeyboardShortcutsPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { category: 'Podstawowe', items: [
      { keys: ['Ctrl', 'Z'], description: 'Cofnij ostatnią akcję' },
      { keys: ['Ctrl', 'Y'], description: 'Ponów cofniętą akcję' },
      { keys: ['Delete'], description: 'Usuń zaznaczony obiekt' },
      { keys: ['Backspace'], description: 'Usuń zaznaczony obiekt' },
    ]},
    { category: 'Kopiowanie i duplikowanie', items: [
      { keys: ['Ctrl', 'C'], description: 'Kopiuj zaznaczony obiekt' },
      { keys: ['Ctrl', 'V'], description: 'Wklej skopiowany obiekt' },
      { keys: ['Ctrl', 'D'], description: 'Duplikuj zaznaczony obiekt' },
    ]},
    { category: 'Edycja tekstu', items: [
      { keys: ['Podwójne kliknięcie'], description: 'Edytuj tekst' },
      { keys: ['Esc'], description: 'Zakończ edycję tekstu' },
    ]},
    { category: 'Zaznaczanie', items: [
      { keys: ['Kliknięcie'], description: 'Zaznacz obiekt' },
      { keys: ['Shift', 'Kliknięcie'], description: 'Zaznacz wiele obiektów' },
      { keys: ['Przeciągnij'], description: 'Zaznacz obszar' },
    ]},
    { category: 'Transformacje', items: [
      { keys: ['Shift', 'Przeciągnij'], description: 'Zachowaj proporcje podczas skalowania' },
      { keys: ['Alt', 'Przeciągnij'], description: 'Skaluj od środka' },
    ]},
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              ⌨️ Skróty klawiszowe
            </h2>
            <p className="text-sm text-indigo-100 mt-1">
              Poznaj wszystkie skróty, które przyspieszą Twoją pracę
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          {shortcuts.map((section, idx) => (
            <div key={idx} className={idx > 0 ? 'mt-6' : ''}>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">
                  {section.category === 'Podstawowe' && '🎯'}
                  {section.category === 'Kopiowanie i duplikowanie' && '📋'}
                  {section.category === 'Edycja tekstu' && '✏️'}
                  {section.category === 'Zaznaczanie' && '🖱️'}
                  {section.category === 'Transformacje' && '🔄'}
                </span>
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((shortcut, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                  >
                    <span className="text-gray-700 flex-1">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, kIdx) => (
                        <span key={kIdx} className="flex items-center gap-1">
                          <kbd className="px-3 py-1.5 bg-white border-2 border-gray-300 rounded-md text-sm font-mono font-semibold text-gray-800 shadow-sm">
                            {key}
                          </kbd>
                          {kIdx < shortcut.keys.length - 1 && (
                            <span className="text-gray-400 font-bold mx-1">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Pro Tips */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              💡 Pro Tips
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Użyj Ctrl+D aby szybko duplikować obiekty w równych odstępach</li>
              <li>• Shift podczas skalowania zachowuje proporcje - idealne dla logo!</li>
              <li>• Zaznacz wiele obiektów Shiftem i użyj narzędzi wyrównywania</li>
              <li>• Grupuj obiekty aby łatwiej nimi zarządzać (ikona Group w headerze)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Naciśnij <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">?</kbd> aby otworzyć ten panel w dowolnym momencie
          </p>
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Rozumiem
          </button>
        </div>
      </div>
    </div>
  );
};
