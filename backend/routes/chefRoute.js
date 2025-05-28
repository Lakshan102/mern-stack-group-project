import express from "express"
import { addFood, listFood ,removeFood, updateStatus} from "../controllers/chefController.js"
import multer from "multer"

const chefRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

chefRouter.post("/add",upload.single("image"),addFood)
chefRouter.get("/list",listFood)
chefRouter.post("/remove",removeFood)
chefRouter.post("/status",updateStatus)


export default chefRouter;