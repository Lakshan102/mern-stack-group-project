import express from "express"
import { addIngredient, listIngredient, removeIngredient, reduceQuantity, addQuantity } from "../controllers/IngredientsController.js";
import multer from "multer"

const ingredientRouter = express.Router();

// image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload =multer({storage:storage})

ingredientRouter.post("/addIngredient",upload.single("image"),addIngredient)
ingredientRouter.get("/listIngredient",listIngredient)
ingredientRouter.post("/removeIngredient",removeIngredient)
ingredientRouter.post("/reduceQuantity",reduceQuantity)
ingredientRouter.post("/addQuantity",addQuantity)


export default ingredientRouter;