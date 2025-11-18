// Konwersja RGB do CMYK dla druku
export function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  // Normalizuj wartości RGB (0-255) do zakresu 0-1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Oblicz K (black)
  const k = 1 - Math.max(rNorm, gNorm, bNorm);

  // Jeśli k = 1, wszystkie kolory są czarne
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  // Oblicz CMY
  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  // Zwróć wartości w procentach (0-100)
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

// Konwersja hex do RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Usuń # jeśli jest
  hex = hex.replace(/^#/, '');

  // Parsuj 3 lub 6 znakowy hex
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    return null;
  }

  return { r, g, b };
}

// Konwersja hex bezpośrednio do CMYK
export function hexToCmyk(hex: string): { c: number; m: number; y: number; k: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToCmyk(rgb.r, rgb.g, rgb.b);
}

// Konwersja mm do punktów (1mm = 2.834645669 punktów)
export function mmToPoints(mm: number): number {
  return mm * 2.834645669;
}

// Konwersja mm do pikseli dla danego DPI
export function mmToPixels(mm: number, dpi: number = 300): number {
  return Math.round((mm / 25.4) * dpi);
}

// Oblicz wymiary z bleedem (spad)
export function calculateWithBleed(
  width: number,
  height: number,
  bleed: number = 3
): { width: number; height: number; bleedMm: number } {
  return {
    width: width + bleed * 2,
    height: height + bleed * 2,
    bleedMm: bleed,
  };
}

// Format rozmiaru pliku
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Walidacja koloru hex
export function isValidHex(hex: string): boolean {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}
