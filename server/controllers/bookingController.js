import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const checkifAvailable=async(car,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
    })
    return bookings.length===0;
}
export const checkAvailability=async(req,res)=>{
    try {
       const {location,pickupDate,returnDate}=req.body
       const cars=await Car.find({location,isAvailable:true}) 
       const promise=cars.map(async(c)=>{
        const isAvailable=await checkifAvailable(c._id,pickupDate,returnDate)
        return{...c._doc,isAvailable:isAvailable}
       })
       let availableCars=await Promise.all(promise);
       availableCars=availableCars.filter(c=>c.isAvailable===true)
       res.json({success:true,availableCars})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const createBooking=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {car,pickupDate,returnDate}=req.body;
        const isAvailable=await checkifAvailable(car,pickupDate,returnDate)
        if(!isAvailable){
            return res.json({success:false,message:"Car is not available"})
        }
        const carData=await Car.findById(car)
        const picked=new Date(pickupDate);
        const returned=new Date(returnDate)
        const noofDays=Math.ceil((returned-picked)/(1000*60*60*24))
        const price=carData.pricePerDay*noofDays;
        await Booking.create({car,owner:carData.owner,user:_id.pickupDate,returnDate,price})
        res.json({success:true,message:"Booking Created"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const getUserbooking=async(req,res)=>{
    try {
        const {_id}=req.user;
        const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true,bookings})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})

    }
}
export const getownerbooking=async(req,res)=>{
    try {
        if(req.user.role!=='owner'){
            return res.json({success:false,message:"Unauthorised"})
        }
        const bookings=await Booking.find({owner:req.user._id}).populate('car user'.select("-user.password").sort({createdAt:-1}))
        res.json({success:true,bookings})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})

    }
}
export const changebookingStatus=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {bookingId,status}=req.body;
        const bookings=await Booking.findById(bookingId);
        if(bookings.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"Unauthorised"})
        }
        bookings.status=status;
        await bookings.save();
        res.json({success:true,bookings})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})

    }
}