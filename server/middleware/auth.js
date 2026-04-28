import jwt from "jsonwebtoken"
import User from "../models/User.js";
export const protect=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.json({success:false,message:"not authorized"})
    }
    try{
        const userid=jwt.verify(token,process.env.JWT_SECRET)
        if(!userid){
            return res.json({success:false,message:"not authorized"})
        }
        req.user=await User.findById(userid).select('-passowrd')
        next();
    }
    catch(error){
        return res.json({success:false,message:"not authorized"})
    }
}