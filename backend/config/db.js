import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://lakshankavindu2725:Chooty%402000@cluster0.xe7vx.mongodb.net/foodweb?retryWrites=true&w=majority').then(()=>console.log("DB connected"))
}
