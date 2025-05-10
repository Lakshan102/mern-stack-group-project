import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    foodId: {type:String,required:true},
    Ingredients: {type:String,required:true},
    cost: {type:Number,required:true},
    name: {type:String,required:true},
    status: {type:String,default:"Pending"}
})

const reviewModel = mongoose.models.review || mongoose.model("review",reviewSchema);

export default reviewModel;