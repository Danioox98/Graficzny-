# Notatki Instalacyjne - Graficzny Kreator

## ⚠️ Ważne: Zależności Systemowe

### Canvas (Node.js) - Wymagania

Aplikacja używa pakietu `canvas` do generowania podglądów PNG. Ten pakiet wymaga natywnych bibliotek systemowych.

#### Ubuntu/Debian (VPS)
```bash
sudo apt-get update
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

#### macOS
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

#### Windows
Pobierz GTK dla Windows lub użyj pakietu pre-built od node-canvas:
```bash
npm install canvas --build-from-source
```

### Po instalacji zależności systemowych

```bash
cd server
npm install
```

## 🚀 Kroki Instalacji (Pełne)

### 1. Przygotuj System (tylko dla VPS/produkcji)

```bash
# Zainstaluj Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Zainstaluj zależności dla canvas
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# Zainstaluj PM2 (opcjonalnie dla produkcji)
sudo npm install -g pm2
```

### 2. Sklonuj i Zainstaluj Projekt

```bash
git clone https://github.com/twoj-repo/Graficzny-.git
cd Graficzny-

# Zainstaluj root dependencies
npm install

# Zainstaluj client dependencies
cd client && npm install && cd ..

# Zainstaluj server dependencies
cd server && npm install && cd ..
```

### 3. Konfiguracja Środowiska

```bash
# Skopiuj przykładowy plik .env
cp server/.env.example server/.env

# Edytuj .env jeśli potrzeba
nano server/.env
```

### 4. Build (dla produkcji)

```bash
# Build całego projektu
npm run build

# Lub osobno:
npm run build:client
npm run build:server
```

### 5. Uruchomienie

**Development:**
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

**Production (z PM2):**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Production (bez PM2):**
```bash
cd server && npm start
# Frontend musi być zbudowany i serwowany przez Nginx
```

## 🔧 Rozwiązywanie Problemów

### Problem: `canvas` nie instaluje się

**Objaw:** Error podczas `npm install` w folderze `server/`
```
gyp ERR! find Python
gyp ERR! configure error
Package 'pangocairo' not found
```

**Rozwiązanie:**
1. Zainstaluj zależności systemowe (patrz wyżej)
2. Wyczyść cache: `npm cache clean --force`
3. Usuń node_modules: `rm -rf node_modules`
4. Zainstaluj ponownie: `npm install`

### Problem: Port już w użyciu

**Objaw:** `EADDRINUSE: address already in use :::3001`

**Rozwiązanie:**
```bash
# Znajdź proces na porcie 3001
lsof -i :3001
# lub
sudo netstat -tulpn | grep 3001

# Zabij proces
kill -9 <PID>
```

### Problem: CORS błędy w przeglądarce

**Objaw:** `Access-Control-Allow-Origin` error

**Rozwiązanie:**
Ustaw poprawny `CORS_ORIGIN` w `server/.env`:
```env
# Development
CORS_ORIGIN=http://localhost:5173

# Production
CORS_ORIGIN=https://twoja-domena.pl
```

### Problem: SQLite błędy

**Objaw:** `SQLITE_ERROR: no such table`

**Rozwiązanie:**
```bash
# Usuń starą bazę
rm server/database.sqlite

# Restart serwera - baza zostanie utworzona automatycznie
cd server && npm run dev
```

## 📦 Hosting bez Docker

### Render.com (Darmowe)

1. Stwórz **Web Service** dla backendu:
   - Build Command: `cd server && npm install && npm run build`
   - Start Command: `cd server && node dist/server.js`
   - Add Environment Variables:
     - `NODE_ENV=production`
     - `PORT=3001`
     - `CORS_ORIGIN=https://your-frontend.onrender.com`

2. Stwórz **Static Site** dla frontendu:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`
   - Add Rewrites: `/*` → `/index.html` (dla React Router)

**Uwaga:** Render.com automatycznie instaluje zależności systemowe dla canvas.

### Railway.app

1. Połącz repo GitHub
2. Dodaj dwa serwisy:
   - Backend (Root: `server/`)
   - Frontend (Root: `client/`)
3. Railway wykrywa Node.js automatycznie

### Vercel (tylko frontend) + Railway (backend)

**Frontend na Vercel:**
```bash
vercel --prod
# Root Directory: client
```

**Backend na Railway** (patrz wyżej)

## 🎯 Checkl ista Produkcyjna

Przed wdrożeniem na produkcję sprawdź:

- [ ] Wszystkie zależności systemowe zainstalowane
- [ ] Node.js 18+ zainstalowany
- [ ] `.env` skonfigurowany poprawnie
- [ ] `CORS_ORIGIN` ustawiony na właściwą domenę
- [ ] Build działa bez błędów (`npm run build`)
- [ ] Port 3001 dostępny (backend)
- [ ] Firewall przepuszcza ruch na porcie 80/443
- [ ] Nginx skonfigurowany (dla VPS)
- [ ] SSL certyfikat zainstalowany (dla VPS)
- [ ] PM2 skonfigurowany do autostartu (dla VPS)
- [ ] Backup strategy w miejscu
- [ ] Logi są monitorowane

## 📞 Wsparcie

W przypadku problemów:
1. Sprawdź logi: `pm2 logs` lub `npm run dev`
2. Sprawdź dokumentację: `DEPLOYMENT.md`
3. Przeszukaj znane problemy w repo

## 🔄 Aktualizacje

```bash
git pull origin main
npm run install:all
npm run build
pm2 restart all
```
