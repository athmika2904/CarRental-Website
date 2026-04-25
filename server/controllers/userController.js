import user from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
const generateToken=(userId)=>{
    const payload=userId;
    return jwt.sign(payload,process.env.SECRET_KEY)
}
export const registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        if(!name||!email||!password||password.length<8){
            return res.json({success:false,message:"Fill all the fields"})
        }
        const userExists=await user.findOne({email})
        if(userExists){
            return res.json({success:false,message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const usermodel=await user.create({name,email,password:hashedPassword})
        const token=generateToken(user._id.toString());
        res.json({success:true,token})

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const LoginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const usermodel=await user.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,usermodel.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=generateToken(user._id.toString());
        res.json({success:true,token})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const getUserData=async (req,res)=>{
    try {
        const {user1}=req;
        res.json({success:true,user1})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}