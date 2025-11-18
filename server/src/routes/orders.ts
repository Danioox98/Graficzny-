import express from 'express';
import { db, generateId } from '../services/database.js';

export const router = express.Router();

// Get all orders
router.get('/', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();

    // Get items for each order
    const ordersWithItems = orders.map((order: any) => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
      return { ...order, items };
    });

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(req.params.id);

    res.json({ ...order, items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create order
router.post('/', (req, res) => {
  try {
    const { items, customerInfo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' });
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return res.status(400).json({ error: 'Customer info is required' });
    }

    const orderId = generateId();
    const now = new Date().toISOString();

    // Calculate total price
    const totalPrice = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Insert order
    const orderStmt = db.prepare(`
      INSERT INTO orders (
        id, total_price, status,
        customer_name, customer_email, customer_phone, customer_address, customer_notes,
        created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    orderStmt.run(
      orderId,
      totalPrice,
      'pending',
      customerInfo.name,
      customerInfo.email,
      customerInfo.phone,
      customerInfo.address || null,
      customerInfo.notes || null,
      now,
      now
    );

    // Insert order items
    const itemStmt = db.prepare(`
      INSERT INTO order_items (id, order_id, project_id, product_id, quantity, price, pdf_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of items) {
      const itemId = generateId();
      itemStmt.run(
        itemId,
        orderId,
        item.projectId,
        item.productId,
        item.quantity,
        item.price,
        item.pdfUrl || null
      );
    }

    // Get the created order with items
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);

    res.status(201).json({ ...order, items: orderItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const now = new Date().toISOString();
    const stmt = db.prepare('UPDATE orders SET status = ?, updated_at = ? WHERE id = ?');
    const result = stmt.run(status, now, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(req.params.id);

    res.json({ ...order, items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});
