import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get profile details
router.get('/', getProfile);

// Admin Protected: Update profile
router.put('/', protect, updateProfile);

export default router; // <-- Yeh line zaroori hai