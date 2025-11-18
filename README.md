# 🎨 Kreator Graficzny - System dla Drukarni

Nowoczesny kreator graficzny online do projektowania materiałów drukowanych.

## 🚀 Funkcje

- **Edytor Drag & Drop** - Intuicyjne przeciąganie i edycja elementów
- **Szablony** - Gotowe szablony wizytówek, ulotek, plakatów, banerów
- **Narzędzia Projektowe**:
  - Teksty z różnymi czcionkami
  - Upload własnych zdjęć
  - Kształty geometryczne
  - Ikony i symbole
  - Warstwy i grupowanie
- **Eksport Profesjonalny** - PDF 300 DPI gotowe do druku (CMYK)
- **Zapisywanie Projektów** - Kontynuuj pracę później
- **System Zamówień** - Koszyk i integracja z drukarnią

## 📋 Wymagania

- Node.js 18+
- npm lub yarn

## 🛠️ Instalacja

```bash
# Instalacja wszystkich zależności
npm run install:all

# Uruchomienie w trybie deweloperskim
npm run dev
```

## 🌐 Dostęp

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📦 Struktura Projektu

```
kreator-graficzny-drukarnia/
├── client/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Komponenty React
│   │   ├── editor/        # Logika edytora
│   │   ├── templates/     # Szablony produktów
│   │   └── utils/         # Narzędzia pomocnicze
│   └── public/
├── server/          # Node.js + Express backend
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── models/        # Modele danych
│   │   └── services/      # Logika biznesowa
│   └── uploads/
└── shared/          # Wspólne typy TypeScript
```

## 🎯 Produkty Drukarskie

1. **Wizytówki** - 85x55mm
2. **Ulotki** - A4, A5, A6, DL
3. **Plakaty** - A3, A2, A1, A0
4. **Banery** - Różne wymiary
5. **Naklejki** - Okrągłe, prostokątne
6. **Zaproszenia** - Różne formaty

## 🔧 Konfiguracja

Skopiuj `.env.example` do `.env` i dostosuj ustawienia:

```env
# Server
PORT=3000
DATABASE_URL=./database.sqlite

# Client
VITE_API_URL=http://localhost:3000

# Upload
MAX_FILE_SIZE=10MB
ALLOWED_FORMATS=jpg,jpeg,png,svg,pdf
```

## 📝 Licencja

MIT License - Copyright (c) 2024 Drukarnia
