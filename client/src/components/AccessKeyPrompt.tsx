import { useState } from 'react';
import { validateAccessKey, activateAccessKey } from '../utils/accessKeys';

interface AccessKeyPromptProps {
  onSuccess: () => void;
}

export const AccessKeyPrompt: React.FC<AccessKeyPromptProps> = ({ onSuccess }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Walidacja klucza
    const validation = validateAccessKey(key);

    if (!validation.valid) {
      setError(validation.error || 'Nieprawidłowy klucz dostępu');
      setLoading(false);
      return;
    }

    // Aktywuj klucz
    try {
      activateAccessKey(key);
      onSuccess();
    } catch (err) {
      setError('Wystąpił błąd podczas aktywacji klucza. Spróbuj ponownie.');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Automatyczne formatowanie na wielkie litery
    const value = e.target.value.toUpperCase();
    setKey(value);
    setError(''); // Wyczyść błąd przy wpisywaniu
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo i nagłówek */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 text-white rounded-full p-4 mb-4">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kreator Graficzny
          </h1>
          <p className="text-lg text-blue-600 font-semibold">GRUPA PLUS</p>
        </div>

        {/* Informacje o dostępie */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            🔑 Wprowadź Klucz Dostępu
          </h2>
          <p className="text-sm text-gray-600">
            Aby korzystać z kreatora, wprowadź kod dostępu otrzymany przy zakupie.
          </p>
        </div>

        {/* Informacje o limicie */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">
            📋 Twój dostęp obejmuje:
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>✓ <strong>48 godzin</strong> dostępu od momentu aktywacji</li>
            <li>✓ <strong>10 eksportów PDF</strong> (300 DPI, gotowe do druku)</li>
            <li>✓ Wszystkie szablony wizytówek i banerów</li>
          </ul>
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="access-key"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Klucz Dostępu
            </label>
            <input
              id="access-key"
              type="text"
              value={key}
              onChange={handleInputChange}
              placeholder="GRUPA-XXXX-XXXX-XXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg text-center uppercase"
              maxLength={24}
              disabled={loading}
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">
              Format: GRUPA-XXXX-XXXX-XXXX lub GRAF-XXXX-XXXX-XXXX
            </p>
          </div>

          {/* Komunikat błędu */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Przycisk */}
          <button
            type="submit"
            disabled={loading || !key}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Aktywuję...
              </>
            ) : (
              'Aktywuj Dostęp'
            )}
          </button>
        </form>

        {/* Dodatkowe informacje */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Nie masz klucza dostępu?{' '}
            <a
              href="https://allegro.pl/uzytkownik/GRUPA-PLUS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Kup na Allegro
            </a>
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Problemy z aktywacją? Skontaktuj się z obsługą klienta.
          </p>
        </div>
      </div>
    </div>
  );
};
