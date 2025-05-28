import newFood from "../models/newFood.js";
import fs from 'fs'

const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;

    const cook = new newFood({
        name:req.body.name,
        ingredients:req.body.ingredients,
        cost:req.body.cost,
        category:req.body.category,
        image:image_filename
    })
    try{
        await cook.save();
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
const listFood = async (req,res)=>{
    try{
        const foods = await newFood.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const removeFood = async (req,res)=>{
    try{
        const food = await newFood.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await newFood.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Remove"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const updateStatus = async (req,res) => {
    try {
        await newFood.findByIdAndUpdate(req.body.foodId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood , listFood , removeFood , updateStatus}