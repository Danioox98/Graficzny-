import PDFDocument from 'pdfkit';
import { createCanvas, Image } from 'canvas';
import { PassThrough } from 'stream';
import { hexToCmyk, mmToPoints, calculateWithBleed, mmToPixels } from '../utils/pdf-helpers.js';

interface CanvasObject {
  type: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  src?: string;
  opacity?: number;
  radius?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

interface CanvasData {
  objects: CanvasObject[];
  background?: string;
}

export interface ExportPDFOptions {
  canvasData: string;
  width: number; // mm
  height: number; // mm
  bleed?: number; // mm (default 3mm)
  dpi?: number; // default 300
  colorMode?: 'RGB' | 'CMYK'; // default CMYK
  title?: string;
  author?: string;
}

export async function generatePDF(options: ExportPDFOptions): Promise<Buffer> {
  const {
    canvasData,
    width,
    height,
    bleed = 3,
    dpi = 300,
    colorMode = 'CMYK',
    title = 'Projekt drukarski',
    author = 'Kreator Graficzny',
  } = options;

  // Parse canvas data
  const data: CanvasData = JSON.parse(canvasData);

  // Oblicz wymiary z bleedem
  const dimensions = calculateWithBleed(width, height, bleed);
  const pdfWidth = mmToPoints(dimensions.width);
  const pdfHeight = mmToPoints(dimensions.height);

  // Offset dla bleeda
  const bleedOffset = mmToPoints(bleed);

  // Utwórz dokument PDF
  const doc = new PDFDocument({
    size: [pdfWidth, pdfHeight],
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: title,
      Author: author,
      Subject: 'Projekt graficzny do druku',
      Creator: 'Kreator Graficzny - Drukarnia Online',
      Producer: 'PDFKit',
    },
  });

  // Skala z pikseli na punkty
  const scale = mmToPoints(1) / (mmToPixels(1, dpi));

  // Tło
  if (data.background) {
    const bgColor = colorMode === 'CMYK' ? hexToCmyk(data.background) : data.background;
    if (typeof bgColor === 'object' && bgColor) {
      // CMYK - PDFKit nie wspiera bezpośrednio CMYK, ale możemy aproksymować
      doc.rect(0, 0, pdfWidth, pdfHeight).fill(data.background);
    } else {
      doc.rect(0, 0, pdfWidth, pdfHeight).fill(data.background as string);
    }
  } else {
    doc.rect(0, 0, pdfWidth, pdfHeight).fill('#FFFFFF');
  }

  // Renderuj obiekty
  for (const obj of data.objects) {
    if (!obj.left || !obj.top) continue;

    const x = mmToPoints(obj.left * (25.4 / dpi)) + bleedOffset;
    const y = mmToPoints(obj.top * (25.4 / dpi)) + bleedOffset;

    doc.save();

    // Zastosuj transformacje
    if (obj.angle) {
      const centerX = x + (obj.width || 0) * (obj.scaleX || 1) * scale / 2;
      const centerY = y + (obj.height || 0) * (obj.scaleY || 1) * scale / 2;
      doc.translate(centerX, centerY);
      doc.rotate(obj.angle);
      doc.translate(-centerX, -centerY);
    }

    // Opacity
    if (obj.opacity !== undefined && obj.opacity < 1) {
      doc.opacity(obj.opacity);
    }

    switch (obj.type) {
      case 'rect':
        const rectWidth = (obj.width || 0) * (obj.scaleX || 1) * scale;
        const rectHeight = (obj.height || 0) * (obj.scaleY || 1) * scale;

        doc.rect(x, y, rectWidth, rectHeight);

        if (obj.fill) {
          doc.fillColor(obj.fill).fill();
        }
        if (obj.stroke && obj.strokeWidth) {
          doc.strokeColor(obj.stroke).lineWidth(obj.strokeWidth).stroke();
        }
        break;

      case 'circle':
        const radius = (obj.radius || 50) * (obj.scaleX || 1) * scale;
        doc.circle(x + radius, y + radius, radius);

        if (obj.fill) {
          doc.fillColor(obj.fill).fill();
        }
        if (obj.stroke && obj.strokeWidth) {
          doc.strokeColor(obj.stroke).lineWidth(obj.strokeWidth).stroke();
        }
        break;

      case 'triangle':
        const triWidth = (obj.width || 0) * (obj.scaleX || 1) * scale;
        const triHeight = (obj.height || 0) * (obj.scaleY || 1) * scale;

        doc.polygon(
          [x + triWidth / 2, y],
          [x + triWidth, y + triHeight],
          [x, y + triHeight]
        );

        if (obj.fill) {
          doc.fillColor(obj.fill).fill();
        }
        if (obj.stroke && obj.strokeWidth) {
          doc.strokeColor(obj.stroke).lineWidth(obj.strokeWidth).stroke();
        }
        break;

      case 'line':
        if (obj.x1 !== undefined && obj.y1 !== undefined && obj.x2 !== undefined && obj.y2 !== undefined) {
          const x1 = mmToPoints(obj.x1 * (25.4 / dpi)) + bleedOffset;
          const y1 = mmToPoints(obj.y1 * (25.4 / dpi)) + bleedOffset;
          const x2 = mmToPoints(obj.x2 * (25.4 / dpi)) + bleedOffset;
          const y2 = mmToPoints(obj.y2 * (25.4 / dpi)) + bleedOffset;

          doc.moveTo(x1, y1).lineTo(x2, y2);

          if (obj.stroke) {
            doc.strokeColor(obj.stroke);
          }
          if (obj.strokeWidth) {
            doc.lineWidth(obj.strokeWidth);
          }
          doc.stroke();
        }
        break;

      case 'i-text':
      case 'text':
      case 'textbox':
        if (obj.text) {
          const fontSize = (obj.fontSize || 16) * scale;
          const fontWeight = obj.fontWeight === 'bold' || obj.fontWeight === 700 ? 'bold' : 'normal';
          const fontStyle = obj.fontStyle === 'italic' ? 'italic' : 'normal';

          // Wybierz font
          let font = 'Helvetica';
          if (fontWeight === 'bold' && fontStyle === 'italic') {
            font = 'Helvetica-BoldOblique';
          } else if (fontWeight === 'bold') {
            font = 'Helvetica-Bold';
          } else if (fontStyle === 'italic') {
            font = 'Helvetica-Oblique';
          }

          doc.font(font).fontSize(fontSize);

          if (obj.fill) {
            doc.fillColor(obj.fill);
          }

          doc.text(obj.text, x, y, {
            width: obj.width ? obj.width * (obj.scaleX || 1) * scale : undefined,
            lineBreak: true,
          });
        }
        break;

      case 'image':
        // Obrazy będą wymagały osobnej implementacji z dekodowaniem base64
        // Na razie pomijamy
        break;
    }

    doc.restore();
  }

  // Dodaj znaki przycinania (crop marks) dla bleeda
  if (bleed > 0) {
    doc.save();
    doc.strokeColor('#000000').lineWidth(0.25);

    const markLength = mmToPoints(5);
    const markOffset = mmToPoints(2);

    // Górny lewy
    doc.moveTo(0, bleedOffset - markOffset)
      .lineTo(markLength, bleedOffset - markOffset)
      .stroke();
    doc.moveTo(bleedOffset - markOffset, 0)
      .lineTo(bleedOffset - markOffset, markLength)
      .stroke();

    // Górny prawy
    doc.moveTo(pdfWidth - markLength, bleedOffset - markOffset)
      .lineTo(pdfWidth, bleedOffset - markOffset)
      .stroke();
    doc.moveTo(pdfWidth - bleedOffset + markOffset, 0)
      .lineTo(pdfWidth - bleedOffset + markOffset, markLength)
      .stroke();

    // Dolny lewy
    doc.moveTo(0, pdfHeight - bleedOffset + markOffset)
      .lineTo(markLength, pdfHeight - bleedOffset + markOffset)
      .stroke();
    doc.moveTo(bleedOffset - markOffset, pdfHeight - markLength)
      .lineTo(bleedOffset - markOffset, pdfHeight)
      .stroke();

    // Dolny prawy
    doc.moveTo(pdfWidth - markLength, pdfHeight - bleedOffset + markOffset)
      .lineTo(pdfWidth, pdfHeight - bleedOffset + markOffset)
      .stroke();
    doc.moveTo(pdfWidth - bleedOffset + markOffset, pdfHeight - markLength)
      .lineTo(pdfWidth - bleedOffset + markOffset, pdfHeight)
      .stroke();

    doc.restore();
  }

  // Finalizuj dokument
  doc.end();

  // Zbierz dane do bufora
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
}

// Pomocnicza funkcja do generowania podglądu PNG
export async function generatePreview(
  canvasData: string,
  width: number,
  height: number,
  dpi: number = 72
): Promise<Buffer> {
  const data: CanvasData = JSON.parse(canvasData);

  const canvasWidth = mmToPixels(width, dpi);
  const canvasHeight = mmToPixels(height, dpi);

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Tło
  if (data.background) {
    ctx.fillStyle = data.background;
  } else {
    ctx.fillStyle = '#FFFFFF';
  }
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Renderuj obiekty (uproszczona wersja)
  for (const obj of data.objects) {
    if (!obj.left || !obj.top) continue;

    ctx.save();

    // Transformacje
    if (obj.angle) {
      const centerX = obj.left + (obj.width || 0) * (obj.scaleX || 1) / 2;
      const centerY = obj.top + (obj.height || 0) * (obj.scaleY || 1) / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((obj.angle * Math.PI) / 180);
      ctx.translate(-centerX, -centerY);
    }

    if (obj.opacity !== undefined) {
      ctx.globalAlpha = obj.opacity;
    }

    switch (obj.type) {
      case 'rect':
        ctx.fillStyle = obj.fill || '#000000';
        ctx.fillRect(
          obj.left,
          obj.top,
          (obj.width || 0) * (obj.scaleX || 1),
          (obj.height || 0) * (obj.scaleY || 1)
        );
        break;

      case 'circle':
        ctx.beginPath();
        const radius = (obj.radius || 50) * (obj.scaleX || 1);
        ctx.arc(obj.left + radius, obj.top + radius, radius, 0, 2 * Math.PI);
        ctx.fillStyle = obj.fill || '#000000';
        ctx.fill();
        break;

      case 'text':
      case 'i-text':
      case 'textbox':
        if (obj.text) {
          const fontSize = obj.fontSize || 16;
          const fontWeight = obj.fontWeight === 'bold' || obj.fontWeight === 700 ? 'bold' : 'normal';
          const fontStyle = obj.fontStyle === 'italic' ? 'italic' : 'normal';
          ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${obj.fontFamily || 'Arial'}`;
          ctx.fillStyle = obj.fill || '#000000';
          ctx.fillText(obj.text, obj.left, obj.top + fontSize);
        }
        break;
    }

    ctx.restore();
  }

  return canvas.toBuffer('image/png');
}
