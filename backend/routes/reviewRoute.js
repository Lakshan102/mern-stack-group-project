import express from "express"
import { updateStatus , chefFood } from "../controllers/adminReviewController.js"

const chefRouter = express.Router();

chefRouter.post("/chefFood",chefFood);
chefRouter.post("/status",updateStatus)

export default chefRouter;