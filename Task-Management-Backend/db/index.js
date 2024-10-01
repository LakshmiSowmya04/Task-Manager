import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/taskmanager';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,   
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
