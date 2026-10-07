import express from 'express';
import Skill from '../models/Skill.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Perfect match

const router = express.Router();

// GET all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new skill
router.post('/', verifyToken, async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (Update) existing skill
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.status(200).json(updatedSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE skill
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;