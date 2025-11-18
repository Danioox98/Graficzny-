# 🛠️ Narzędzia Pomocnicze

Ten folder zawiera narzędzia pomocnicze dla Kreatora Graficznego.

## 📋 Dostępne Narzędzia

### 🔑 Generator Kluczy Dostępowych

**Plik:** `generateAccessKeys.js`

Generuje unikalne klucze dostępu do kreatora graficznego, przydatne przy sprzedaży na Allegro lub kontroli dostępu.

**Szybki start:**
```bash
# Generuj 10 kluczy
node generateAccessKeys.js

# Generuj 50 kluczy z własnym prefixem
node generateAccessKeys.js 50 DRUK

# Generuj 100 kluczy dla promocji
node generateAccessKeys.js 100 PROMO2024
```

**Co otrzymasz:**
- Plik JSON - do użytku w API/backendzie
- Plik TXT - do wysyłki klientom
- Plik CSV - do zarządzania w Excel

**Pełna dokumentacja:** Zobacz `ACCESS_KEYS_GUIDE.md`

---

## 📂 Struktura

```
tools/
├── generateAccessKeys.js      # Generator kluczy
├── ACCESS_KEYS_GUIDE.md       # Kompletny przewodnik
└── README.md                  # Ten plik
```

Wygenerowane klucze są zapisywane w katalogu:
```
access-keys/
├── keys_GRAF_2024-11-18.json
├── keys_GRAF_2024-11-18.txt
└── keys_GRAF_2024-11-18.csv
```

---

## 💡 Przykłady Użycia

### Sprzedaż na Allegro

1. Wygeneruj klucze: `node generateAccessKeys.js 100`
2. Otwórz plik `.txt` w folderze `access-keys/`
3. Przy każdej sprzedaży wyślij klientowi kolejny klucz
4. Śledź użycie w pliku CSV

### Kontrola Dostępu (Opcja 3: Combo - 48h + 10 PDF)

✅ **ZAIMPLEMENTOWANE W APLIKACJI!**

Każdy klucz dostępu daje:
- **48 godzin** dostępu od momentu aktywacji
- **10 eksportów PDF** (300 DPI, gotowych do druku)
- Dostęp wygasa gdy **pierwszy limit zostanie osiągnięty**

Jak to działa:
1. Wygeneruj klucze z unikalnym prefixem
2. Klient kupuje klucz na Allegro
3. Klient wpisuje klucz w aplikacji
4. System aktywuje dostęp na 48h + 10 pobrań
5. W prawym górnym rogu widzi licznik pozostałego czasu i pobrań
6. Po wykorzystaniu dostęp wygasa

---

## 🔧 Wymagania

- Node.js 18+ (zainstalowany crypto module)
- Żadne dodatkowe pakiety nie są wymagane

---

## 🆘 Pomoc

Jeśli masz pytania lub problemy:
1. Zobacz pełną dokumentację w `ACCESS_KEYS_GUIDE.md`
2. Sprawdź przykłady użycia powyżej
3. Napisz issue na GitHub

---

**Ostatnia aktualizacja:** 2024-11-18
