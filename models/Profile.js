import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Your Name' },
    title: { type: String, default: 'Full Stack Developer' },
    bio: { type: String, default: 'Write something about yourself...' },
    avatar: { type: String, default: '' },
    resumeUrl: { type: String, default: '' }, 
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;