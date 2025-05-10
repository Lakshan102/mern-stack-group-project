import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator"
import orderModel from "../models/orderModel.js";


//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

            const token = createToken(user._id);
            res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
 
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
const registerUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try {
        //check is user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"please enter a strong password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
    
}

// Update student
const updateprofile =async (req, res) => {
    const { name,email } = req.body;

    try {
        const updatedStudent = await userModel.findOneAndUpdate(
            { email },
            { name },
            { new: true }
        );

        if (updatedStudent) {
            res.status(200).send({ status: "Update successful", user: updatedStudent });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating user", error: err.message });
    }
};


// Delete student
const deleteprofile =(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({ status: "User not found" });
        }
        await orderModel.deleteMany({userId:user._id})
        await user.deleteOne();
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting user", error: err.message });
    }
});



export {loginUser,registerUser,updateprofile,deleteprofile}

const extractDataFromToken = (token)=>{
    return jwt.decode(token,process.env.JWT_SECRET)
}

// get user data by id
export const getProfileByToken = async (req, res) => {
    const {token} = req.body;
    
    try {
        const tokenData = extractDataFromToken(token);
        if(!tokenData){
            return res.status(400).json({success:false,message:"Invalid Token"})
        }
        
        const data = await userModel.findById(tokenData.id);
        
        if(!data){
            return res.sendStatus(404);
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting user", error: err.message });
        
    }
}