import user from "../models/User.js";
import fs from 'fs';
import client from "../configs/imageKit.js";
export const changeToOwner=async(req,res)=>{
    try {
        const {_id}=req.user;
        await user.findByIdAndUpdate(_id,{role:"Owner"})
        res.json({success:true,message:"Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const addCar=async(req,res)=>{
    try {
        const {_id}=req.user;
        let car=JSON.parse(req.body.carData);
        const imageFile=req.file;
        const fileBuffer=fs.readFileSync(imageFile.path)
       const response= await client.upload({
            file:fileBuffer,
            filename:imageFile.originalname,
            folder:'/cars'
        })
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}