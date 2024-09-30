import mongoose from "mongoose"; 

// MongoDB connection URIs
const MONGODB_URI = "mongodb+srv://username:password@cluster0.zn5ekhe.mongodb.net"; // Use this for the cloud MongoDB
// const MONGODB_URI = "mongodb://localhost:27017/taskmanager"; // Use this for local MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB; 
