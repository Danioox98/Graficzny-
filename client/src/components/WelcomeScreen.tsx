import { useState } from 'react';
import { X, MousePointer, Image, Download } from 'lucide-react';

interface WelcomeScreenProps {
  onClose: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: MousePointer,
      title: '1. Rozpocznij od szybkich bloków',
      description: 'Po lewej stronie znajdziesz gotowe bloki tekstu dla wizytówek i banerów. Kliknij "Imię i nazwisko", "Telefon" lub inne - tekst pojawi się automatycznie i będziesz mógł go edytować.',
      tip: '💡 Możesz też użyć zwykłego narzędzia "Tekst" do własnych pól',
    },
    {
      icon: Image,
      title: '2. Dodaj logo lub zdjęcie',
      description: 'Kliknij "Obraz" w narzędziach i wybierz plik. System automatycznie sprawdzi jakość obrazu i ostrzeże Cię, jeśli rozdzielczość będzie za niska do druku.',
      tip: '⚠️ Zalecane minimum 300 DPI dla optymalnej jakości druku',
    },
    {
      icon: Download,
      title: '3. Eksportuj gotowy projekt',
      description: 'Gdy skończysz projekt, kliknij "Eksportuj PDF" u góry. Otrzymasz profesjonalny plik PDF z 300 DPI, CMYK i 3mm spadami - gotowy do druku offsetowego.',
      tip: '✅ Pamiętaj: nie umieszczaj tekstu poza zieloną linią (strefa bezpieczna)',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          title="Zamknij"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Witaj w Kreatorze Graficznym! 🎨
          </h2>
          <p className="text-gray-600">
            Poznaj podstawy w 3 krokach
          </p>
        </div>

        {/* Step content */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon size={40} className="text-primary-600" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            {step.title}
          </h3>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
            {step.description}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">{step.tip}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-primary-600 w-8'
                  : index < currentStep
                  ? 'bg-primary-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-0 disabled:cursor-default transition-opacity"
          >
            ← Wstecz
          </button>

          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Pomiń
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Rozpocznij' : 'Dalej →'}
          </button>
        </div>
      </div>
    </div>
  );
};
