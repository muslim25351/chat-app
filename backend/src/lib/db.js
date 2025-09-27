import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONOGODB_URI);
    console.log(`Connected to MongoDB:${con.connection.host}`);
  } catch (error) {
    console.log("monogodb error:", error);
  }
};
