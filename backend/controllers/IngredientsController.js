import ingredientModel from "../models/ingredientModel.js";
import fs from 'fs'

// add ingredient item
const addIngredient = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const ingredient = new ingredientModel({
        name:req.body.name,
        quantity:req.body.quantity,
        image:image_filename
    })
    try {
        await ingredient.save();
        res.json({success:true,message:"Ingredient Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all ingredient list
const listIngredient = async (req,res) => {
    try {
        const ingredients = await ingredientModel.find({});
        res.json({success:true,data:ingredients})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove ingredient
const removeIngredient = async (req,res) => {
    try {
        const ingredient = await ingredientModel.findById(req.body.id);
        fs.unlink(`uploads/${ingredient.image}`,()=>{})

        await ingredientModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Ingredient Remove"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// reduce ingredient
const reduceQuantity = async (req,res) => {
    try {
        const ingredient = await ingredientModel.findById(req.body.id);
        
        if (ingredient.quantity > 0) {
            ingredient.quantity -= 1;
            await ingredient.save();
            res.json({success:true,message:"Quantity reduced."});
        }else{
            res.json({success:false,message:"Error"});
        }
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// add Quantity
const addQuantity = async (req,res) => {
    try {
        const ingredient = await ingredientModel.findById(req.body.id);

        ingredient.quantity += 1;
        await ingredient.save();
        res.json({success:true,message:"Quantity added."});
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export { addIngredient,listIngredient,removeIngredient,reduceQuantity,addQuantity }