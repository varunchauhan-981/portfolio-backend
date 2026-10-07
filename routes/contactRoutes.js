import express from 'express';
import Contact from '../models/Contact.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // <-- Fix: Changed 'protect' to 'verifyToken'

const router = express.Router();

// GET all contact messages (Admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new contact message (Public - for everyone)
router.post('/', async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a contact message (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;