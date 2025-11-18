import express from 'express';
import { db, generateId } from '../services/database.js';

export const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project by ID
router.get('/:id', (req, res) => {
  try {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project
router.post('/', (req, res) => {
  try {
    const { name, productId, templateId, canvasData } = req.body;

    if (!name || !productId || !canvasData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = generateId();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO projects (id, name, product_id, template_id, canvas_data, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, name, productId, templateId || null, canvasData, now, now);

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', (req, res) => {
  try {
    const { name, canvasData, thumbnail } = req.body;
    const now = new Date().toISOString();

    const updates: string[] = [];
    const values: any[] = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (canvasData) {
      updates.push('canvas_data = ?');
      values.push(canvasData);
    }
    if (thumbnail !== undefined) {
      updates.push('thumbnail = ?');
      values.push(thumbnail);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = ?');
    values.push(now);
    values.push(req.params.id);

    const stmt = db.prepare(`
      UPDATE projects SET ${updates.join(', ')} WHERE id = ?
    `);

    const result = stmt.run(...values);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});
