import Profile from '../models/Profile.js';

// @desc    Get user profile details
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Agar pehli baar hai toh empty default profile bana do
      profile = await Profile.create({
        name: 'Varun Chauhan',
        title: 'Full Stack Developer',
        bio: 'Welcome to my portfolio!',
        avatar: '',
        github: '',
        linkedin: ''
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private (Admin only)
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    const updated = await profile.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};