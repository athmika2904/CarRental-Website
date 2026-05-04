import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeToOwner, deleteCar, getDashboardData, getownerCars, toggleCarAvailability, updateImg } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
 const ownerRouter=express.Router();
ownerRouter.post("/change-role",protect,changeToOwner);
ownerRouter.post("/add-car",upload.single("image",protect,addCar))
ownerRouter.post("/cars",protect,getownerCars)
ownerRouter.post("/toggle-car",protect,toggleCarAvailability)
ownerRouter.post("/delete-car",protect,deleteCar)
ownerRouter.get('/dashboard',protect,getDashboardData);
ownerRouter.post('/update-image',upload.single("image"),protect,updateImg)
export default ownerRouter