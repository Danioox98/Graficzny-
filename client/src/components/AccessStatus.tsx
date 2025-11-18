import { useState, useEffect } from 'react';
import { checkAccessStatus, formatRemainingTime, clearAccessKey } from '../utils/accessKeys';

interface AccessStatusProps {
  onAccessExpired: () => void;
}

export const AccessStatus: React.FC<AccessStatusProps> = ({ onAccessExpired }) => {
  const [status, setStatus] = useState(checkAccessStatus());
  const [showDetails, setShowDetails] = useState(false);

  // Odświeżaj status co minutę
  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = checkAccessStatus();
      setStatus(newStatus);

      // Jeśli dostęp wygasł, powiadom rodzica
      if (!newStatus.hasAccess) {
        clearAccessKey();
        onAccessExpired();
      }
    }, 60000); // Co 60 sekund

    return () => clearInterval(interval);
  }, [onAccessExpired]);

  if (!status.hasAccess || !status.data) {
    return null;
  }

  const { remainingHours = 0, remainingDownloads = 0 } = status;

  // Kolory ostrzeżeń
  const isTimeWarning = remainingHours <= 6;
  const isDownloadWarning = remainingDownloads <= 3;

  const timeColor = isTimeWarning ? 'text-orange-600' : 'text-green-600';
  const downloadColor = isDownloadWarning ? 'text-orange-600' : 'text-green-600';

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Kompaktowy widok */}
      <div
        className="bg-white rounded-lg shadow-lg border-2 border-blue-600 p-3 cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center space-x-3">
          {/* Ikona klucza */}
          <div className="bg-blue-600 text-white rounded-full p-2">
            <svg
              className="w-5 h-5"
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

          {/* Skrócone info */}
          <div className="text-sm">
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${timeColor}`}>
                {remainingHours}h
              </span>
              <span className="text-gray-400">•</span>
              <span className={`font-bold ${downloadColor}`}>
                {remainingDownloads}/10 PDF
              </span>
            </div>
          </div>

          {/* Strzałka rozwijania */}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              showDetails ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Rozwinięty widok */}
      {showDetails && (
        <div className="mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Status Dostępu
          </h3>

          {/* Czas pozostały */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Czas pozostały:
              </span>
              <span className={`text-sm font-bold ${timeColor}`}>
                {formatRemainingTime(remainingHours)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isTimeWarning ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((remainingHours / 48) * 100, 100)}%` }}
              />
            </div>
            {isTimeWarning && (
              <p className="text-xs text-orange-600 mt-1">
                ⚠️ Dostęp wkrótce wygaśnie!
              </p>
            )}
          </div>

          {/* Pobrania pozostałe */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Eksporty PDF:
              </span>
              <span className={`text-sm font-bold ${downloadColor}`}>
                {remainingDownloads} / 10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isDownloadWarning ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${(remainingDownloads / 10) * 100}%` }}
              />
            </div>
            {isDownloadWarning && (
              <p className="text-xs text-orange-600 mt-1">
                ⚠️ Pozostało {remainingDownloads} {remainingDownloads === 1 ? 'pobranie' : 'pobrania'}!
              </p>
            )}
          </div>

          {/* Informacje o kluczu */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Klucz:</span>
                <span className="font-mono text-gray-700">
                  {status.data.key}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Aktywowany:</span>
                <span className="text-gray-700">
                  {new Date(status.data.activatedAt).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Wygasa:</span>
                <span className="text-gray-700">
                  {new Date(status.data.expiresAt).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Pomoc */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <p className="text-xs text-gray-600">
              💡 Chcesz przedłużyć dostęp?{' '}
              <a
                href="https://allegro.pl/uzytkownik/GRUPA-PLUS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Kup nowy klucz
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
