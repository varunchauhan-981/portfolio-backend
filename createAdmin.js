import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const email = 'admin@example.com';
    const rawPassword = 'adminpassword123';
    const username = 'admin';

    // Purana admin clean karein
    await User.deleteMany({ email });

    // Directly hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    // Save directly to bypass any double hashing
    await User.collection.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin account created clean and fresh!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${rawPassword}`);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();