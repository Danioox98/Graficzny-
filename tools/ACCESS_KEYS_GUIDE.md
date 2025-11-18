# 🔑 System Kluczy Dostępowych - Kompletny Przewodnik

## Spis Treści
1. [Generowanie Kluczy](#generowanie-kluczy)
2. [Integracja z Aplikacją](#integracja-z-aplikacją)
3. [Sprzedaż na Allegro](#sprzedaż-na-allegro)
4. [Zarządzanie Kluczami](#zarządzanie-kluczami)
5. [Przykłady Użycia](#przykłady-użycia)

---

## 📦 Generowanie Kluczy

### Podstawowe użycie:

```bash
# Przejdź do katalogu tools
cd tools

# Generuj 10 kluczy (domyślnie)
node generateAccessKeys.js

# Generuj 50 kluczy
node generateAccessKeys.js 50

# Generuj 100 kluczy z własnym prefixem
node generateAccessKeys.js 100 GRUPA

# Generuj klucze dla konkretnej promocji
node generateAccessKeys.js 20 PROMO2024
```

### Format kluczy:

```
GRAF-ABCD-EFGH-JKLM    (domyślny)
DRUK-XYZ4-5678-9ABC    (prefix DRUK)
GRUPA-2024-ABC3-DEF6   (prefix GRUPA)
```

### Wygenerowane pliki:

Po uruchomieniu generatora otrzymasz 3 pliki w folderze `access-keys/`:

1. **keys_PREFIX_TIMESTAMP.json** - dla API/backendu
2. **keys_PREFIX_TIMESTAMP.txt** - dla klientów (1 klucz = 1 linia)
3. **keys_PREFIX_TIMESTAMP.csv** - dla Excel/zarządzania

---

## 🔌 Integracja z Aplikacją

### Wariant A: Prosty System (Bez Backendu)

Dodaj weryfikację kluczy bezpośrednio w aplikacji React:

**1. Utwórz plik `/client/src/utils/accessKeys.ts`:**

```typescript
// Lista aktywnych kluczy (wklej z wygenerowanego pliku TXT)
const VALID_KEYS = [
  'GRAF-ABCD-EFGH-JKLM',
  'GRAF-XYZ4-5678-9ABC',
  // ... więcej kluczy
];

// Sprawdź czy klucz jest poprawny
export function validateAccessKey(key: string): boolean {
  const normalizedKey = key.toUpperCase().trim();
  return VALID_KEYS.includes(normalizedKey);
}

// Zapisz klucz w localStorage po weryfikacji
export function saveAccessKey(key: string): void {
  localStorage.setItem('accessKey', key);
  localStorage.setItem('accessKeyValidatedAt', new Date().toISOString());
}

// Sprawdź czy użytkownik ma zapisany klucz
export function hasValidAccessKey(): boolean {
  const savedKey = localStorage.getItem('accessKey');
  return savedKey ? validateAccessKey(savedKey) : false;
}
```

**2. Dodaj komponent logowania `/client/src/components/AccessKeyPrompt.tsx`:**

```typescript
import { useState } from 'react';
import { validateAccessKey, saveAccessKey } from '@/utils/accessKeys';

export const AccessKeyPrompt: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAccessKey(key)) {
      saveAccessKey(key);
      onSuccess();
    } else {
      setError('Nieprawidłowy klucz dostępu. Sprawdź czy został wpisany poprawnie.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">🔑 Wprowadź Klucz Dostępu</h2>
        <p className="text-gray-600 mb-6">
          Aby korzystać z Kreatora Graficznego, wprowadź kod dostępu otrzymany przy zakupie.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="GRAF-XXXX-XXXX-XXXX"
            className="w-full p-3 border rounded mb-4 uppercase"
            maxLength={19}
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold">
            Aktywuj Dostęp
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          Nie masz klucza? Kup dostęp na <a href="https://allegro.pl" className="text-blue-600">Allegro</a>
        </p>
      </div>
    </div>
  );
};
```

**3. Zmodyfikuj `/client/src/App.tsx`:**

```typescript
import { useState, useEffect } from 'react';
import { AccessKeyPrompt } from './components/AccessKeyPrompt';
import { hasValidAccessKey } from './utils/accessKeys';

function App() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    setHasAccess(hasValidAccessKey());
  }, []);

  if (!hasAccess) {
    return <AccessKeyPrompt onSuccess={() => setHasAccess(true)} />;
  }

  // Reszta aplikacji...
  return (
    <div className="editor-layout">
      {/* Twoja aplikacja */}
    </div>
  );
}
```

### Wariant B: System z Backendem (Zaawansowany)

**Backend API dla weryfikacji kluczy:**

```javascript
// server/src/routes/accessKeys.ts
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Wczytaj klucze z pliku JSON
const keysPath = path.join(__dirname, '../../access-keys/keys_GRAF_latest.json');
let accessKeys = JSON.parse(fs.readFileSync(keysPath, 'utf-8'));

// Endpoint: Weryfikacja klucza
router.post('/verify', (req, res) => {
  const { key } = req.body;

  const keyData = accessKeys.find(k => k.key === key);

  if (!keyData) {
    return res.status(404).json({
      valid: false,
      message: 'Klucz nie istnieje'
    });
  }

  if (keyData.used) {
    return res.status(403).json({
      valid: false,
      message: 'Klucz został już wykorzystany',
      usedAt: keyData.usedAt
    });
  }

  // Oznacz klucz jako użyty
  keyData.used = true;
  keyData.usedAt = new Date().toISOString();
  keyData.usedBy = req.ip;

  // Zapisz zmiany
  fs.writeFileSync(keysPath, JSON.stringify(accessKeys, null, 2));

  res.json({
    valid: true,
    message: 'Klucz aktywowany pomyślnie',
    expiresAt: null // Opcjonalnie: data wygaśnięcia
  });
});

// Endpoint: Sprawdź status klucza (bez aktywacji)
router.get('/check/:key', (req, res) => {
  const { key } = req.params;
  const keyData = accessKeys.find(k => k.key === key);

  if (!keyData) {
    return res.json({ exists: false });
  }

  res.json({
    exists: true,
    used: keyData.used,
    usedAt: keyData.usedAt
  });
});

export default router;
```

**Użycie w aplikacji React:**

```typescript
// client/src/utils/accessKeys.ts (wersja z API)
const API_URL = 'https://twoj-backend.com/api/access-keys';

export async function validateAccessKey(key: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Błąd weryfikacji klucza:', error);
    return false;
  }
}
```

---

## 🛒 Sprzedaż na Allegro

### Przygotowanie Aukcji:

**Tytuł aukcji:**
```
Kreator Graficzny Online - Wizytówki i Banery 300 DPI - Klucz Dostępu
```

**Opis aukcji (szablon):**

```markdown
🎨 KREATOR GRAFICZNY ONLINE - PROFESJONALNE PROJEKTY

✅ CO OTRZYMUJESZ:
- Unikalny klucz dostępu do kreatora graficznego
- 12 profesjonalnych szablonów wizytówek
- 9 gotowych szablonów banerów reklamowych
- Eksport do PDF 300 DPI (gotowe do druku)
- Dostęp bezterminowy
- Instrukcja obsługi

📐 FUNKCJE:
- Edytor graficzny online (bez instalacji)
- Szablony wizytówek: minimalistyczne, biznesowe, kreatywne
- Szablony banerów: sprzedam mieszkanie, wynajem, usługi, oferty pracy
- Formaty druku: 85x55mm, 100x200cm
- Jakość druku: 300 DPI, CMYK

🔑 JAK TO DZIAŁA:
1. Kupujesz - otrzymujesz klucz dostępu (np. GRAF-ABCD-EFGH-JKLM)
2. Wchodzisz na stronę kreatora: https://kreator.grupaplus.pl
3. Wpisujesz klucz - masz dostęp!
4. Projektujesz i eksportujesz do PDF

💡 IDEALNY DLA:
- Osób prowadzących własną działalność
- Sprzedawców nieruchomości
- Małych firm potrzebujących materiałów reklamowych
- Drukarni oferujących projekty dla klientów

📞 KONTAKT:
W razie pytań - pisz śmiało!
```

**Po sprzedaży - wiadomość do kupującego:**

```
Dziękujemy za zakup! 🎉

Twój klucz dostępu: GRAF-XXXX-XXXX-XXXX

JAK ZACZĄĆ:
1. Wejdź na: https://kreator.grupaplus.pl
2. Wpisz powyższy klucz
3. Wybierz szablon i projektuj!

INSTRUKCJA:
- Pełna instrukcja: https://kreator.grupaplus.pl/instrukcja
- Film tutorial: https://youtube.com/...

WSPARCIE:
W razie problemów napisz wiadomość!

Pozdrawiamy,
GRUPA PLUS
```

---

## 📊 Zarządzanie Kluczami

### 1. Śledzenie Użycia (Excel):

Otwórz plik CSV w Excel:
- Kolumna "Użyty" - czy klucz został aktywowany
- Kolumna "Data Użycia" - kiedy klucz użyto
- Filtruj według statusu

### 2. Raport Sprzedaży:

```bash
# Policz użyte klucze
grep "true" access-keys/keys_GRAF_*.csv | wc -l

# Policz nieużyte klucze
grep "false" access-keys/keys_GRAF_*.csv | wc -l
```

### 3. Generowanie Nowych Partii:

```bash
# Co miesiąc generuj nową partię z datą
node generateAccessKeys.js 100 GRAF-JAN2024
node generateAccessKeys.js 100 GRAF-FEB2024
```

---

## 💡 Przykłady Użycia

### Scenariusz 1: Sprzedaż 50 kluczy miesięcznie

```bash
# 1. Wygeneruj klucze na początek miesiąca
node generateAccessKeys.js 50 GRAF-MAJ24

# 2. Skopiuj klucze z pliku TXT do Excel/Notes
# 3. Przy każdej sprzedaży na Allegro - skopiuj kolejny klucz
# 4. Wyślij klientowi w wiadomości

# 5. Na koniec miesiąca sprawdź statystyki
# Otwórz CSV i zobacz ile kluczy zostało użytych
```

### Scenariusz 2: Promocja czasowa (kod rabatowy)

```bash
# Wygeneruj specjalne klucze promocyjne
node generateAccessKeys.js 20 PROMO-30

# Udostępnij wszystkim na Facebooku/Instagram
# Limit: pierwsze 20 osób
```

### Scenariusz 3: Darmowe klucze testowe

```bash
# Wygeneruj klucze testowe na 7 dni
node generateAccessKeys.js 10 TEST-7D

# Rozdaj influencerom/testerom
# Monitoruj feedback
```

---

## 🔒 Bezpieczeństwo

### Zabezpieczenia:

1. **Nie publikuj listy wszystkich kluczy publicznie**
2. **Jeden klucz = jeden użytkownik** (weryfikuj w backendzie)
3. **Przechowuj pliki JSON w bezpiecznym miejscu**
4. **Regularnie twórz backup używanych kluczy**

### Backup:

```bash
# Codziennie kopiuj pliki z kluczami
cp access-keys/*.json backup/$(date +%Y%m%d)/
```

---

## 📞 Wsparcie

W razie pytań lub problemów:
- Email: kontakt@grupaplus.pl
- Telefon: +48 XXX XXX XXX
- GitHub Issues: https://github.com/Danioox98/Graficzny-/issues

---

**Utworzono:** 2024
**Wersja:** 1.0
**Autor:** GRUPA PLUS
