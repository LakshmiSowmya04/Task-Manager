import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/env-config.js';

const connectDB = async () => {
  try {
    const DB_NAME = 'taskmanager';

    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
