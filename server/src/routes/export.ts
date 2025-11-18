import express from 'express';
import { generatePDF, generatePreview } from '../services/pdf-export.js';
import { db, generateId } from '../services/database.js';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const router = express.Router();

// Ensure exports directory exists
const exportsDir = join(process.cwd(), 'exports');
if (!existsSync(exportsDir)) {
  await mkdir(exportsDir, { recursive: true });
}

// Export project to PDF
router.post('/pdf', async (req, res) => {
  try {
    const { projectId, canvasData, width, height, bleed, dpi, colorMode, title } = req.body;

    if (!canvasData || !width || !height) {
      return res.status(400).json({ error: 'Missing required fields: canvasData, width, height' });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF({
      canvasData,
      width,
      height,
      bleed: bleed || 3,
      dpi: dpi || 300,
      colorMode: colorMode || 'CMYK',
      title: title || 'Projekt drukarski',
    });

    // Save to file
    const filename = `${projectId || generateId()}_${Date.now()}.pdf`;
    const filepath = join(exportsDir, filename);
    await writeFile(filepath, pdfBuffer);

    // Update project with PDF URL if projectId provided
    if (projectId) {
      const stmt = db.prepare('UPDATE projects SET thumbnail = ? WHERE id = ?');
      stmt.run(`/exports/${filename}`, projectId);
    }

    res.json({
      success: true,
      filename,
      url: `/exports/${filename}`,
      size: pdfBuffer.length,
      message: 'PDF wygenerowany pomyślnie',
    });
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Download PDF directly
router.post('/pdf/download', async (req, res) => {
  try {
    const { canvasData, width, height, bleed, dpi, colorMode, title } = req.body;

    if (!canvasData || !width || !height) {
      return res.status(400).json({ error: 'Missing required fields: canvasData, width, height' });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF({
      canvasData,
      width,
      height,
      bleed: bleed || 3,
      dpi: dpi || 300,
      colorMode: colorMode || 'CMYK',
      title: title || 'Projekt drukarski',
    });

    const filename = `${title?.replace(/[^a-z0-9]/gi, '_') || 'projekt'}_${Date.now()}.pdf`;

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF download error:', error);
    res.status(500).json({ error: 'Failed to download PDF' });
  }
});

// Generate preview image (PNG)
router.post('/preview', async (req, res) => {
  try {
    const { canvasData, width, height, dpi } = req.body;

    if (!canvasData || !width || !height) {
      return res.status(400).json({ error: 'Missing required fields: canvasData, width, height' });
    }

    // Generate preview (lower DPI for preview)
    const previewBuffer = await generatePreview(
      canvasData,
      width,
      height,
      dpi || 72
    );

    // Save to file
    const filename = `preview_${generateId()}.png`;
    const filepath = join(exportsDir, filename);
    await writeFile(filepath, previewBuffer);

    res.json({
      success: true,
      filename,
      url: `/exports/${filename}`,
      size: previewBuffer.length,
    });
  } catch (error) {
    console.error('Preview generation error:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

// Get PDF info
router.get('/info/:projectId', async (req, res) => {
  try {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      projectId: project.id,
      hasPdf: !!project.thumbnail,
      pdfUrl: project.thumbnail,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get export info' });
  }
});
