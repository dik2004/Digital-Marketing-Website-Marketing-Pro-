import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/digital-marketing";
    
    if (!process.env.MONGO_URI) {
      console.warn("⚠️  MONGO_URI not found in .env file. Using default: mongodb://localhost:27017/digital-marketing");
      console.warn("💡 Create a .env file in the root directory with: MONGO_URI=your_connection_string");
    }
    
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("💡 Make sure MongoDB is running and the connection string is correct");
    process.exit(1);
  }
};

export default connectDB;
