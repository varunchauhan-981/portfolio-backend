import express from 'express';
import Profile from '../models/Profile.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // <-- Fix: Changed 'protect' to 'verifyToken'

const router = express.Router();

// GET profile data (Public)
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (Update) profile data (Admin only)
router.put('/', verifyToken, async (req, res) => { // <-- Fix: Changed 'protect' to 'verifyToken'
  try {
    let profile = await Profile.findOne();
    if (profile) {
      // Agar profile pehle se hai toh update karein
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    } else {
      // Agar nahi hai toh nayi create karein
      profile = new Profile(req.body);
      await profile.save();
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;