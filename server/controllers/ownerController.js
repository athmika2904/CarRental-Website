import User from "../models/User.js";
import fs from 'fs';
import client from "../configs/imageKit.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
export const changeToOwner=async(req,res)=>{
    try {
        const {_id}=req.user;
        await User.findByIdAndUpdate(_id,{role:"owner"})
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
        const url = client.helper.buildSrc({
        src: response.filePath,
        transformation: [
        {
        width: 1280,
        height: 300,
        crop: 'maintain_ratio',
        quality: 'auto',
        format: 'webp',
        },
  ],
        });
        const image=url;
        await Car.create({...car,owner:_id,image})
        res.json({success:true, message:"Car Added"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const getownerCars=async(req,res)=>{
    try {
        const {_id}=req.user;
        const cars=await Car.find({owner:_id})
        res.json({success:true,cars});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}
export const toggleCarAvailability=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId)
        if(car.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"Unauthorized"})
        }
        car.isAvailable=!car.isAvailable;
        await car.save()
        res.json({success:true,message:"Availability toggled"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const deleteCar=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId)
        if(car.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"Unauthorized"})
        }
        car.owner=null;
        car.isAvailable=false;
        await car.save()
        res.json({success:true,message:"car removed"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const getDashboardData=async(req,res)=>{
    try {
       const {_id,role}=req.user;
       if(role!=='owner'){
        return res.json({success:false,message:"Unauthorized"})
       } 
       const  cars=await Car.find({owner:_id})
       const bookings=await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});
       const pendings=await Booking.find({owner:_id,status:"pending"})
       const confirmed=await Booking.find({owner:_id,status:"confirmed"})
       const monthlyRevenue=bookings.slice().filter(b=>b.status==='confirmed').reduce((acc,b)=>acc+b.price,0);
       const dashboardData={
        totalCars:cars.length,
        totalBookings:bookings.length,
        pendingBookings:pendings.length,
        completedBookings:confirmed.length,
        recentBookings:bookings.slice(0,3),
        monthlyRevenue
       }
       res.json({success:true,dashboardData})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const updateImg=async(req,res)=>{
    try {
        const {_id,role}=req.user;
         const imageFile=req.file;
        const fileBuffer=fs.readFileSync(imageFile.path)
       const response= await client.upload({
            file:fileBuffer,
            filename:imageFile.originalname,
            folder:'/users'
        })
        const url = client.helper.buildSrc({
        src: response.filePath,
        transformation: [
        {
        width: 400,
        height: 300,
        crop: 'maintain_ratio',
        quality: 'auto',
        format: 'webp',
        },
  ],
        });
        const image=url;
        await User.findByIdAndUpdate(_id,{image});
        res.json({success:true,message:"Image updated"})
    } catch (error) {
       console.log(error.message);
        res.json({success:false,message:error.message}) 
    }
}