import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Saare skills fetch karna
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Protected: Naya skill add karna
router.post('/', protect, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin Protected: Skill delete karna
router.delete('/:id', protect, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;