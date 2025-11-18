# 📖 Instrukcja Użytkowania Kreatora Graficznego

## 🚀 Szybki Start

### 1. Instalacja

```bash
# Sklonuj repozytorium (jeśli jeszcze nie masz)
git clone <repository-url>
cd kreator-graficzny-drukarnia

# Zainstaluj wszystkie zależności (frontend + backend)
npm run install:all
```

### 2. Konfiguracja

```bash
# Skopiuj przykładowy plik .env dla serwera
cp server/.env.example server/.env

# Edytuj server/.env jeśli potrzebujesz zmienić ustawienia
```

### 3. Uruchomienie

```bash
# Uruchom aplikację (frontend + backend jednocześnie)
npm run dev
```

Aplikacja będzie dostępna pod:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🎨 Korzystanie z Kreatora

### Wybór Produktu

1. Po uruchomieniu aplikacji zobaczysz galerię produktów
2. Przeglądaj kategorie: Wizytówki, Ulotki, Plakaty, Banery, Naklejki, Zaproszenia
3. Kliknij "Rozpocznij projekt" na wybranym produkcie

### Edytor Graficzny

#### Pasek Narzędzi (Lewa Strona)

- **Tekst** - Dodaj tekst do projektu
- **Obraz** - Wgraj własne zdjęcie
- **Prostokąt** - Dodaj prostokąt
- **Okrąg** - Dodaj okrąg
- **Trójkąt** - Dodaj trójkąt
- **Linia** - Dodaj linię
- **Usuń** - Usuń zaznaczone obiekty

#### Górny Pasek

- **Cofnij (Ctrl+Z)** - Cofnij ostatnią akcję
- **Ponów (Ctrl+Y)** - Przywróć cofniętą akcję
- **Zoom** - Przybliż/oddal widok
- **Siatka** - Włącz/wyłącz siatkę pomocniczą
- **Zapisz** - Zapisz projekt
- **Eksportuj PDF** - Eksportuj do pliku PDF gotowego do druku

#### Panel Właściwości (Prawa Strona)

Gdy zaznaczysz obiekt, możesz edytować:
- **Pozycję** (X, Y)
- **Rozmiar** (szerokość, wysokość)
- **Obrót** (0-360°)
- **Kolor**
- **Przezroczystość**

Dla tekstu dodatkowo:
- Treść
- Czcionka
- Rozmiar czcionki
- Pogrubienie/kursywa

### Praca z Obiektami

#### Dodawanie Obiektów
- Kliknij narzędzie w lewym pasku
- Obiekt pojawi się na canvas
- Przeciągnij i upuść w wybranym miejscu

#### Edycja Obiektów
- Kliknij obiekt aby go zaznaczyć
- Przeciągaj aby przesunąć
- Użyj uchwytów narożników aby zmienić rozmiar
- Obróć używając uchwytu rotacji
- Edytuj właściwości w prawym panelu

#### Tekst
- Kliknij "Tekst" w lewym pasku
- Kliknij dwukrotnie tekst aby edytować treść
- Użyj panelu właściwości aby zmienić czcionkę, rozmiar, kolor

#### Obrazy
- Kliknij "Obraz" w lewym pasku
- Wybierz plik z dysku (JPG, PNG, SVG, WebP)
- Obraz zostanie dodany do canvas
- Zmień rozmiar i pozycję według potrzeb

### Skróty Klawiszowe

- `Ctrl+Z` - Cofnij
- `Ctrl+Y` - Ponów
- `Delete` - Usuń zaznaczone obiekty
- `Ctrl+C` - Kopiuj
- `Ctrl+V` - Wklej

### Zapisywanie i Eksport

#### Zapisz Projekt
- Kliknij "Zapisz" w górnym pasku
- Projekt zostanie zapisany w bazie danych
- Możesz wrócić do niego później

#### Eksport do PDF
- Kliknij "Eksportuj PDF" w górnym pasku
- Plik PDF zostanie wygenerowany w jakości 300 DPI
- Gotowy do druku w drukarni

## 🛒 Zamawianie

1. Po zakończeniu projektu dodaj do koszyka
2. Określ ilość egzemplarzy
3. Przejdź do koszyka (ikona koszyka w prawym górnym rogu)
4. Wypełnij dane kontaktowe
5. Złóż zamówienie

Zamówienie trafi do systemu drukarni z plikiem PDF gotowym do druku.

## 💡 Wskazówki

### Projektowanie dla Druku

1. **Rozdzielczość**: Wszystkie projekty są automatycznie w 300 DPI
2. **Kolory**: Używaj jasnych, kontrastowych kolorów
3. **Teksty**: Minimalna czcionka to 8pt dla czytelności
4. **Marginesy**: Zostaw 3-5mm marginesu od krawędzi
5. **Obrazy**: Używaj wysokiej jakości zdjęć

### Optymalizacja Pracy

1. **Szablony**: Użyj gotowego szablonu jako punktu wyjścia
2. **Warstwy**: Grupuj powiązane elementy
3. **Siatka**: Włącz siatkę dla precyzyjnego ustawienia
4. **Zapisuj często**: Zapisuj projekt regularnie
5. **Testuj wydruk**: Wyeksportuj PDF i sprawdź przed zamówieniem

### Rozwiązywanie Problemów

#### Obraz jest nieostry
- Użyj obrazu o wyższej rozdzielczości
- Minimalna szerokość: 1000px dla małych wydruków

#### Kolory różnią się od ekranu
- Ekrany używają RGB, druk używa CMYK
- Jasne kolory mogą być ciemniejsze w druku
- Zamów próbkę przed dużym zamówieniem

#### Tekst jest nieczytelny
- Zwiększ rozmiar czcionki
- Użyj kontrastowego koloru
- Wybierz czytelną czcionkę (Arial, Helvetica)

## 📞 Wsparcie

W razie pytań lub problemów:
- Sprawdź dokumentację: README.md
- Zgłoś problem: [GitHub Issues]
- Kontakt: kontakt@drukarnia.pl

## 🎓 Przykładowe Projekty

### Wizytówka Biznesowa
1. Wybierz "Wizytówka standardowa"
2. Dodaj tło ciemne (czarny prostokąt)
3. Dodaj tekst z imieniem i nazwiskiem (biały, 48px)
4. Dodaj stanowisko (mniejsza czcionka, 24px)
5. Dodaj dane kontaktowe na dole
6. Eksportuj PDF

### Ulotka Promocyjna
1. Wybierz "Ulotka A5"
2. Użyj szablonu lub zacznij od pustego
3. Dodaj nagłówek z nazwą promocji
4. Dodaj zdjęcie produktu
5. Dodaj szczegóły promocji
6. Dodaj dane kontaktowe
7. Eksportuj PDF

### Plakat Eventowy
1. Wybierz "Plakat A2"
2. Dodaj tło z gradientem
3. Dodaj tytuł eventu (duża czcionka)
4. Dodaj datę i miejsce
5. Dodaj logo organizatora
6. Eksportuj PDF

---

**Powodzenia w projektowaniu! 🎨**
