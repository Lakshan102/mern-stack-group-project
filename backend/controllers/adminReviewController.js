import reviewModel from "../models/reviewModel";
// import foodModel from "../models/foodModel";

const chefFood = async (req,res) => {
    const review = new reviewModel({
        foodId:req.body.foodId,
        name:req.body.name,
        cost:req.body.cost,
        Ingredients:req.body.Ingredients
    })
    try {
        const foods = await reviewModel.find({foodId:req.body.foodId});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {chefFood,updateStatus}