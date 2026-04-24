import express from "express";
import { LoginUser, registerUser } from "../controllers/userController";
const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUserUser)
export default userRouter;