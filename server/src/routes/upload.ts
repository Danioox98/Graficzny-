import express from 'express';
import multer from 'multer';
import { join, extname } from 'path';
import { db, generateId } from '../services/database.js';

export const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const id = generateId();
    const ext = extname(file.originalname);
    cb(null, `${id}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, SVG, and WebP are allowed.'));
    }
  },
});

// Upload file
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const id = generateId();
    const url = `/uploads/${req.file.filename}`;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO uploaded_files (id, filename, url, mimetype, size, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      req.file.filename,
      url,
      req.file.mimetype,
      req.file.size,
      now
    );

    res.json({
      id,
      filename: req.file.filename,
      url,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Get uploaded files
router.get('/', (req, res) => {
  try {
    const files = db.prepare('SELECT * FROM uploaded_files ORDER BY uploaded_at DESC').all();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});
