import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB Connnected ");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
