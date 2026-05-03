import express from "express";
import { changebookingStatus, checkAvailability, createBooking, getownerbooking, getUserbooking } from "../controllers/bookingController.js";
import {protect} from "../middleware/auth.js"
const bookingRouter=express.Router();
bookingRouter.post('check-availability',checkifAvailable)
bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/user',protect,getUserbooking)
bookingRouter.get('/owner',protect,getownerbooking)
bookingRouter.post('/change-status',protect,changebookingStatus)
export default bookingRouter;