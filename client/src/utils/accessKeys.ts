/**
 * System Kontroli Dostępu - Klucze Dostępowe
 *
 * Funkcje:
 * - Weryfikacja kluczy dostępowych
 * - Limit czasowy: 48 godzin od aktywacji
 * - Limit pobrań: 10 PDF
 * - Śledzenie użycia w localStorage
 */

export interface AccessKeyData {
  key: string;
  activatedAt: string;
  expiresAt: string;
  downloadsUsed: number;
  downloadsLimit: number;
}

// Stałe konfiguracyjne
const ACCESS_KEY_STORAGE_KEY = 'graficzny_access_key';
const VALID_TIME_HOURS = 48;
const DOWNLOAD_LIMIT = 10;

// Lista wszystkich aktywnych kluczy (wygenerowanych przez generateAccessKeys.js)
// W produkcji te klucze mogą być weryfikowane przez backend API
const VALID_KEYS = [
  // Przykładowe klucze - zastąp rzeczywistymi kluczami z pliku TXT
  'GRUPA-DFLH-UTGC-43HU',
  'GRUPA-XE8H-ATF2-ANU9',
  'GRUPA-LEU5-PECZ-VF5X',
  'GRUPA-WQJ4-L2MB-NYYA',
  'GRUPA-8SZV-K85A-FYLL',
  // Dodaj więcej kluczy z wygenerowanych plików
];

/**
 * Sprawdza format klucza dostępowego
 * Format: PREFIX-XXXX-XXXX-XXXX
 */
export function isValidKeyFormat(key: string): boolean {
  const pattern = /^[A-Z0-9]+-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(key.toUpperCase().trim());
}

/**
 * Sprawdza czy klucz istnieje na liście aktywnych kluczy
 */
export function isKeyInDatabase(key: string): boolean {
  const normalizedKey = key.toUpperCase().trim();
  return VALID_KEYS.includes(normalizedKey);
}

/**
 * Aktywuje klucz dostępowy i zapisuje w localStorage
 */
export function activateAccessKey(key: string): AccessKeyData {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + VALID_TIME_HOURS * 60 * 60 * 1000);

  const accessData: AccessKeyData = {
    key: key.toUpperCase().trim(),
    activatedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    downloadsUsed: 0,
    downloadsLimit: DOWNLOAD_LIMIT
  };

  localStorage.setItem(ACCESS_KEY_STORAGE_KEY, JSON.stringify(accessData));
  return accessData;
}

/**
 * Pobiera dane klucza z localStorage
 */
export function getStoredAccessKey(): AccessKeyData | null {
  const stored = localStorage.getItem(ACCESS_KEY_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AccessKeyData;
  } catch {
    return null;
  }
}

/**
 * Sprawdza czy klucz wygasł (przekroczono 48h)
 */
export function isKeyExpired(accessData: AccessKeyData): boolean {
  const now = new Date();
  const expiresAt = new Date(accessData.expiresAt);
  return now > expiresAt;
}

/**
 * Sprawdza czy przekroczono limit pobrań
 */
export function isDownloadLimitReached(accessData: AccessKeyData): boolean {
  return accessData.downloadsUsed >= accessData.downloadsLimit;
}

/**
 * Sprawdza czy użytkownik ma aktywny dostęp
 * Zwraca obiekt z informacjami o dostępie
 */
export function checkAccessStatus(): {
  hasAccess: boolean;
  reason?: string;
  data?: AccessKeyData;
  remainingHours?: number;
  remainingDownloads?: number;
} {
  const accessData = getStoredAccessKey();

  if (!accessData) {
    return {
      hasAccess: false,
      reason: 'no_key'
    };
  }

  // Sprawdź wygaśnięcie czasowe
  if (isKeyExpired(accessData)) {
    return {
      hasAccess: false,
      reason: 'expired_time',
      data: accessData
    };
  }

  // Sprawdź limit pobrań
  if (isDownloadLimitReached(accessData)) {
    return {
      hasAccess: false,
      reason: 'expired_downloads',
      data: accessData
    };
  }

  // Oblicz pozostały czas
  const now = new Date();
  const expiresAt = new Date(accessData.expiresAt);
  const remainingMs = expiresAt.getTime() - now.getTime();
  const remainingHours = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60)));
  const remainingDownloads = accessData.downloadsLimit - accessData.downloadsUsed;

  return {
    hasAccess: true,
    data: accessData,
    remainingHours,
    remainingDownloads
  };
}

/**
 * Inkrementuje licznik pobrań
 * Zwraca true jeśli operacja się powiodła, false jeśli limit został osiągnięty
 */
export function incrementDownloadCounter(): boolean {
  const accessData = getStoredAccessKey();
  if (!accessData) return false;

  // Sprawdź czy nie przekroczono już limitu
  if (isDownloadLimitReached(accessData)) {
    return false;
  }

  // Inkrementuj licznik
  accessData.downloadsUsed += 1;
  localStorage.setItem(ACCESS_KEY_STORAGE_KEY, JSON.stringify(accessData));

  return true;
}

/**
 * Usuwa klucz dostępowy z localStorage (wylogowanie)
 */
export function clearAccessKey(): void {
  localStorage.removeItem(ACCESS_KEY_STORAGE_KEY);
}

/**
 * Formatuje czas pozostały do wygaśnięcia
 */
export function formatRemainingTime(hours: number): string {
  if (hours < 1) {
    return 'Mniej niż 1 godzina';
  } else if (hours === 1) {
    return '1 godzina';
  } else if (hours < 24) {
    return `${hours} godzin`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (days === 1) {
      return remainingHours > 0 ? `1 dzień i ${remainingHours}h` : '1 dzień';
    } else {
      return remainingHours > 0 ? `${days} dni i ${remainingHours}h` : `${days} dni`;
    }
  }
}

/**
 * Główna funkcja weryfikacji klucza
 * Używana przy logowaniu
 */
export function validateAccessKey(key: string): {
  valid: boolean;
  error?: string;
} {
  // Sprawdź format
  if (!isValidKeyFormat(key)) {
    return {
      valid: false,
      error: 'Nieprawidłowy format klucza. Oczekiwany format: GRUPA-XXXX-XXXX-XXXX'
    };
  }

  // Sprawdź czy klucz istnieje w bazie
  if (!isKeyInDatabase(key)) {
    return {
      valid: false,
      error: 'Klucz dostępu nie istnieje lub został już wykorzystany przez inną osobę.'
    };
  }

  return { valid: true };
}
