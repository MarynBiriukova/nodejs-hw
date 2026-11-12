import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try{
  const dbUrl = process.env.MONGO_URL;
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connection established successfully");
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

