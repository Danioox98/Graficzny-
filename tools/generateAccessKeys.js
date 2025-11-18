#!/usr/bin/env node

/**
 * Generator Kluczy Dostępowych dla Kreatora Graficznego
 *
 * Użycie:
 *   node generateAccessKeys.js [liczba_kluczy] [prefix]
 *
 * Przykłady:
 *   node generateAccessKeys.js 10           // Generuje 10 kluczy z domyślnym prefixem
 *   node generateAccessKeys.js 50 DRUK      // Generuje 50 kluczy z prefixem DRUK
 *   node generateAccessKeys.js 100 GRUPA    // Generuje 100 kluczy z prefixem GRUPA
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Pobierz parametry z linii poleceń
const args = process.argv.slice(2);
const numberOfKeys = parseInt(args[0]) || 10;
const prefix = args[1] || 'GRAF';

/**
 * Generuje losowy klucz dostępu
 * @param {string} prefix - Prefix klucza (np. DRUK, GRAF)
 * @param {number} length - Długość losowej części klucza
 * @returns {string} Wygenerowany klucz
 */
function generateAccessKey(prefix, length = 12) {
  // Generuj losowy ciąg znaków (tylko wielkie litery i cyfry, bez mylących znaków jak O/0, I/1)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    randomPart += chars[randomIndex];
  }

  // Dodaj separatory dla lepszej czytelności: GRAF-ABCD-EFGH-IJKL
  const formatted = randomPart.match(/.{1,4}/g).join('-');

  return `${prefix}-${formatted}`;
}

/**
 * Generuje wiele kluczy i zapisuje do pliku
 */
function generateKeys() {
  console.log(`\n🔑 Generator Kluczy Dostępowych dla Kreatora Graficznego`);
  console.log(`═══════════════════════════════════════════════════════\n`);
  console.log(`Generowanie ${numberOfKeys} kluczy z prefixem "${prefix}"...\n`);

  const keys = [];
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];

  // Generuj klucze
  for (let i = 0; i < numberOfKeys; i++) {
    const key = generateAccessKey(prefix);
    keys.push({
      id: i + 1,
      key: key,
      generatedAt: new Date().toISOString(),
      used: false,
      usedAt: null,
      usedBy: null
    });
  }

  // Przygotuj katalog na klucze
  const keysDir = path.join(__dirname, '../access-keys');
  if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir, { recursive: true });
  }

  // Zapisz klucze do pliku JSON (do użytku programistycznego)
  const jsonFilename = `keys_${prefix}_${timestamp}.json`;
  const jsonPath = path.join(keysDir, jsonFilename);
  fs.writeFileSync(jsonPath, JSON.stringify(keys, null, 2));

  // Zapisz klucze do pliku tekstowego (do wysyłki klientom)
  const txtFilename = `keys_${prefix}_${timestamp}.txt`;
  const txtPath = path.join(keysDir, txtFilename);
  const txtContent = keys.map(k => k.key).join('\n');
  fs.writeFileSync(txtPath, txtContent);

  // Zapisz klucze do CSV (do importu do Excel/Allegro)
  const csvFilename = `keys_${prefix}_${timestamp}.csv`;
  const csvPath = path.join(keysDir, csvFilename);
  const csvContent = 'ID,Klucz,Data Generacji,Użyty,Data Użycia,Użytkownik\n' +
    keys.map(k => `${k.id},${k.key},${k.generatedAt},${k.used},${k.usedAt || ''},${k.usedBy || ''}`).join('\n');
  fs.writeFileSync(csvPath, csvContent);

  // Wyświetl podsumowanie
  console.log(`✅ Wygenerowano ${numberOfKeys} kluczy!\n`);
  console.log(`Zapisano pliki:`);
  console.log(`  📄 JSON (API):     ${jsonFilename}`);
  console.log(`  📄 TXT (klienci):  ${txtFilename}`);
  console.log(`  📄 CSV (Excel):    ${csvFilename}`);
  console.log(`\nLokalizacja: ${keysDir}\n`);

  // Pokaż przykładowe klucze
  console.log(`Przykładowe klucze:\n`);
  keys.slice(0, 5).forEach(k => {
    console.log(`  ${k.id}. ${k.key}`);
  });

  if (numberOfKeys > 5) {
    console.log(`  ... i ${numberOfKeys - 5} więcej\n`);
  }

  // Instrukcje dla użytkownika
  console.log(`\n📋 Jak użyć kluczy:\n`);
  console.log(`1. SPRZEDAŻ NA ALLEGRO:`);
  console.log(`   - Skopiuj klucz z pliku TXT`);
  console.log(`   - Wyślij klientowi jako wiadomość po zakupie`);
  console.log(`   - Klient wpisuje klucz przy logowaniu\n`);

  console.log(`2. WERYFIKACJA W APLIKACJI:`);
  console.log(`   - Wgraj plik JSON do backendu`);
  console.log(`   - API sprawdzi czy klucz istnieje i nie był użyty`);
  console.log(`   - Po użyciu klucz zostanie oznaczony jako 'użyty'\n`);

  console.log(`3. ZARZĄDZANIE KLUCZAMI:`);
  console.log(`   - Otwórz plik CSV w Excel`);
  console.log(`   - Śledź które klucze zostały użyte`);
  console.log(`   - Eksportuj raporty sprzedaży\n`);

  console.log(`═══════════════════════════════════════════════════════\n`);
}

// Uruchom generator
try {
  generateKeys();
} catch (error) {
  console.error('❌ Błąd podczas generowania kluczy:', error.message);
  process.exit(1);
}
