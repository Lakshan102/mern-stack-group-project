import mongoose from "mongoose";
import 'dotenv/config.js';

export const connectDB = async()=>{
await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
}
