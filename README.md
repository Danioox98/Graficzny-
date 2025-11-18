# 🎨 Kreator Graficzny dla Drukarni

Profesjonalny kreator graficzny online skupiony na **wizytówkach i banerach** dla drukarni offsetowej.

## ✨ Funkcje

- ✅ **24 szablony wizytówek** (Business, Creative, Minimal, branżowe)
- ✅ **9 szablonów banerów** (roll-up i reklamowe)
- ✅ **Edytor Fabric.js** z pełną kontrolą nad elementami
- ✅ **Eksport PDF 300 DPI CMYK** z 3mm spadami
- ✅ **System filtrowania** szablonów po tagach
- ✅ **Wyszukiwarka** szablonów
- ✅ **Gotowy do produkcji offsetowej**

## 📋 Wymagania

- Node.js 18+
- npm lub yarn

## 🚀 Szybki Start (Lokalnie)

### Instalacja

```bash
# 1. Sklonuj repozytorium
git clone <repo-url>
cd Graficzny-

# 2. Zainstaluj zależności dla obu projektów
cd client && npm install
cd ../server && npm install
cd ..
```

### Uruchomienie

```bash
# Terminal 1 - Backend (port 3001)
cd server
npm run dev

# Terminal 2 - Frontend (port 5173)
cd client
npm run dev
```

Otwórz przeglądarkę: **http://localhost:5173**

## 📦 Build Produkcyjny

```bash
# Build frontend
cd client
npm run build
# Wynik w: client/dist/

# Build backend
cd server
npm run build
# Wynik w: server/dist/
```

## 🌐 Wdrożenie

Zobacz szczegółowe instrukcje wdrożenia w:
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Pełna instrukcja wdrożenia (VPS, Render, Vercel)
- **[INSTALLATION_NOTES.md](./INSTALLATION_NOTES.md)** - Rozwiązywanie problemów i wymagania systemowe

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

## 🎯 Szablony

### Wizytówki (24 szablony)
- **Business** (3): Profesjonalne, Eleganckie, Korporacyjne
- **Creative** (3): Kreatywne, Artystyczne, Designerskie
- **Minimal** (3): Minimalistyczne, Czyste, Proste
- **Branżowe** (15):
  - Tech/IT, Medyczne, Prawnicze, Fotograficzne
  - Beauty/Uroda, Chef/Gastronomia, Fitness, Nieruchomości
  - Mechanik, Budowlane, Kwiaciarnia, Księgowość
  - Ubezpieczenia, Architekt, Rzemieślnik

### Banery (9 szablonów)
- **Roll-up** (6): Firmowy, Produktowy, Medyczny, Fitness, Salon Urody, Auto Serwis
- **Reklamowe** (3): Restauracja, Sklep (Wyprzedaż), Nieruchomości

## 🔧 Konfiguracja

### Backend (.env)

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
DATABASE_PATH=./database.sqlite
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

Więcej opcji w `server/.env.example`

## 📝 Dostępne Skrypty

```bash
# Root
npm run dev              # Uruchom oba projekty jednocześnie
npm run install:all      # Zainstaluj wszystkie zależności
npm run build           # Build całego projektu
npm run deploy:build    # Install + Build (gotowe do wdrożenia)

# Client
npm run dev             # Dev server (Vite)
npm run build           # Production build
npm run preview         # Preview production build

# Server
npm run dev             # Dev server (tsx watch)
npm run build           # TypeScript compilation
npm start               # Uruchom build produkcyjny
```

## 🔒 Opcje Monetyzacji

### Model 1: Darmowy kreator + płatność za druk (ZALECANE)
- Kreator dostępny dla wszystkich za darmo
- Zarabiasz na druku zamówionych projektów
- Brak barier wejścia dla klientów

### Model 2: Sprzedaż dostępu (np. Allegro)
- Sprzedajesz kody dostępu na Allegro
- Klient otrzymuje kod i może korzystać z kreatora
- Implementacja: zobacz `DEPLOYMENT.md` sekcja "Kontrola Dostępu"

### Model 3: Freemium
- Podstawowe szablony za darmo
- Premium szablony po opłacie
- Eksport wysokiej jakości (300 DPI) płatny

## 💡 Koszty Hostingu

**Najtańsza opcja (Render.com):**
- Backend: Darmowy (z ograniczeniami)
- Frontend: Darmowy
- **Koszt: 0 zł/mc**

**Zalecana opcja (VPS):**
- VPS OVH/home.pl: ~30 zł/mc
- Domena: ~50 zł/rok (~4 zł/mc)
- **Koszt: ~34 zł/mc**

## 🎨 Stack Technologiczny

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Fabric.js (canvas)
- Zustand (state management)
- Lucide React (ikony)

**Backend:**
- Node.js + Express
- TypeScript
- SQLite (better-sqlite3)
- PDFKit (eksport PDF 300 DPI CMYK)
- Multer (upload plików)

## 📞 Wsparcie

W razie problemów:
1. Sprawdź [INSTALLATION_NOTES.md](./INSTALLATION_NOTES.md)
2. Sprawdź [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Sprawdź logi: `pm2 logs` lub `npm run dev`

## 📄 Licencja

MIT

---

**Stworzone dla nowoczesnych drukarni offsetowych z profesjonalnym sprzętem** 🖨️
