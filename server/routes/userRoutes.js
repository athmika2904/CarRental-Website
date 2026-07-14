import express from "express";
import { getCars, getCarById,  getUserData, LoginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)
userRouter.get('/data',protect,getUserData)
userRouter.get('/cars', getCars);
userRouter.get('/cars/:id', getCarById);
export default userRouter;