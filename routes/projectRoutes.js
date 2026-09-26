const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Public routes: koi bhi dekh sakta hai
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes: sirf logged-in admin use kar sakta hai
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
