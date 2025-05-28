import mongoose from "mongoose";

const newFoodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    ingredients :{type:String,required:true},
    cost :{type:String,required:true},
    image :{type:String,required:true},
    status: {type:String,default:"Pending"},
    category: {type:String,required:true},
   
})

const newFood = mongoose.models.chef || mongoose.model("chef",newFoodSchema);

export default newFood;