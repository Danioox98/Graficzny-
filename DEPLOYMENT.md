# Graficzny - Instrukcja Uruchomienia i Wdrożenia

Kreator graficzny dla drukarni - skupiony na wizytówkach i banerach.

## 🚀 Szybki Start (Lokalne Uruchomienie)

### Wymagania
- Node.js 18+ (zalecane Node.js 20)
- npm lub yarn
- Port 3000 (frontend) i 3001 (backend) wolne

### Instalacja i Uruchomienie

1. **Zainstaluj zależności dla całego projektu:**
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

2. **Uruchom aplikację w trybie deweloperskim:**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend (w nowym terminalu)
cd client
npm run dev
```

3. **Otwórz przeglądarkę:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📦 Build Produkcyjny

### Budowanie Aplikacji

1. **Build Frontend:**
```bash
cd client
npm run build
# Pliki produkcyjne w: client/dist/
```

2. **Build Backend:**
```bash
cd server
npm run build
# Pliki produkcyjne w: server/dist/
```

## 🌐 Opcje Wdrożenia

### Opcja 1: VPS (Najbardziej Elastyczna)

**Zalecane dla**: Pełna kontrola, własne brandowanie

**Dostawcy VPS:**
- OVH (polski, od ~30 zł/mc)
- home.pl (polski, od ~20 zł/mc)
- DigitalOcean (międzynarodowy, od $6/mc)
- Hetzner (niemiecki, od €4/mc)

**Kroki wdrożenia na VPS:**

1. **Zaloguj się na serwer i zainstaluj Node.js:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
```

2. **Sklonuj projekt na serwer:**
```bash
cd /var/www
git clone https://github.com/twoj-repo/Graficzny-.git
cd Graficzny-
```

3. **Zainstaluj zależności i zbuduj:**
```bash
cd client && npm install && npm run build
cd ../server && npm install && npm run build
```

4. **Zainstaluj PM2 (manager procesów):**
```bash
sudo npm install -g pm2
```

5. **Utwórz plik ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'graficzny-backend',
    cwd: '/var/www/Graficzny-/server',
    script: 'dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
```

6. **Uruchom backend z PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

7. **Skonfiguruj Nginx jako reverse proxy:**
```nginx
# /etc/nginx/sites-available/graficzny
server {
    listen 80;
    server_name twoja-domena.pl;

    # Frontend (pliki statyczne)
    location / {
        root /var/www/Graficzny-/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Aktywuj konfigurację:**
```bash
sudo ln -s /etc/nginx/sites-available/graficzny /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **Zainstaluj certyfikat SSL (HTTPS):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d twoja-domena.pl
```

### Opcja 2: Render.com (Najprostsze, Darmowe)

**Zalecane dla**: Szybkie wdrożenie bez konfiguracji serwera

1. **Utwórz konto na render.com**

2. **Dodaj Backend (Web Service):**
   - Build Command: `cd server && npm install && npm run build`
   - Start Command: `cd server && node dist/index.js`
   - Environment: Node

3. **Dodaj Frontend (Static Site):**
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`

4. **Skonfiguruj zmienne środowiskowe w Backend:**
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://twoj-frontend.onrender.com`

### Opcja 3: Vercel (Frontend) + Railway (Backend)

**Zalecane dla**: Nowoczesne wdrożenie z szybkim CI/CD

**Frontend na Vercel:**
1. Połącz repo GitHub z Vercel
2. Ustaw Root Directory: `client`
3. Build Command: `npm run build`
4. Output Directory: `dist`

**Backend na Railway:**
1. Połącz repo GitHub z Railway
2. Ustaw Root Directory: `server`
3. Dodaj zmienne środowiskowe
4. Railway automatycznie wykryje Node.js

## 🔒 Opcje Kontroli Dostępu (dla Allegro)

### Wariant A: Kod Dostępu (Najprostszy dla Allegro)

1. **Dodaj do server/.env:**
```env
ACCESS_CODE=DRUK2024
```

2. **Dodaj middleware w server/src/index.ts:**
```typescript
app.use((req, res, next) => {
  const code = req.headers['x-access-code'];
  if (code !== process.env.ACCESS_CODE) {
    return res.status(403).json({ error: 'Nieprawidłowy kod dostępu' });
  }
  next();
});
```

3. **W aukcji Allegro podaj kod dostępu kupującemu**

### Wariant B: Indywidualne Kody (Rekomendowane dla Allegro)

Szczegóły w pliku: `docs/ACCESS_CONTROL.md` (do stworzenia)

## 📊 Monitorowanie

### Logi PM2:
```bash
pm2 logs graficzny-backend
pm2 monit
```

### Status aplikacji:
```bash
pm2 status
```

### Restart aplikacji:
```bash
pm2 restart graficzny-backend
```

## 🔧 Rozwiązywanie Problemów

### Aplikacja nie startuje
```bash
# Sprawdź logi
pm2 logs

# Sprawdź czy port 3001 jest wolny
sudo netstat -tulpn | grep 3001

# Restart
pm2 restart all
```

### Problemy z CORS
Dodaj do `server/.env`:
```env
CORS_ORIGIN=https://twoja-domena.pl
```

### Brak miejsca na dysku
```bash
# Wyczyść niepotrzebne pliki node_modules
npm cache clean --force
pm2 flush  # Wyczyść logi
```

## 💡 Rekomendowany Setup dla Drukarni

**Najprostsze rozwiązanie:**
1. Kup domenę (np. `kreator.twojadrukarnia.pl`) - ~50 zł/rok
2. Kup VPS OVH lub home.pl - ~30 zł/mc
3. Wdróż według instrukcji VPS powyżej
4. Sprzedawaj na Allegro z kodem dostępu (Wariant A)

**Koszt:**
- Domena: ~50 zł/rok
- VPS: ~30 zł/mc = ~360 zł/rok
- **RAZEM: ~410 zł/rok (~34 zł/mc)**

## 📞 Wsparcie

W razie problemów sprawdź:
- Logi aplikacji: `pm2 logs`
- Logi Nginx: `sudo tail -f /var/log/nginx/error.log`
- Status systemd: `sudo systemctl status nginx`

## 🎯 Funkcje Kreatora

- ✅ 24 szablony wizytówek (Business, Creative, Minimal, branżowe)
- ✅ 9 szablonów banerów (roll-up i reklamowe)
- ✅ Eksport PDF 300 DPI CMYK z spadami
- ✅ System filtrowania i wyszukiwania
- ✅ Edytor Fabric.js z pełną kontrolą
- ✅ Gotowy do produkcji offsetowej

## 📋 Checklist przed uruchomieniem

- [ ] Node.js 18+ zainstalowany
- [ ] Wszystkie zależności zainstalowane (`npm install`)
- [ ] Build działa lokalnie (`npm run build`)
- [ ] Backend odpowiada na http://localhost:3001
- [ ] Frontend ładuje się na http://localhost:3000
- [ ] Szablony się wyświetlają
- [ ] Eksport PDF działa
- [ ] Wybrana opcja hostingu (VPS/Render/Vercel)
- [ ] Domena skonfigurowana (opcjonalnie)
- [ ] SSL certyfikat zainstalowany (dla VPS)
