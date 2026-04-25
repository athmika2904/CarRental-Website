import express from "express";
import { changeToOwner } from "../controllers/ownerController";
 const ownerRouter=express.Router();
ownerRouter.post("/change-role",protect,changeToOwner);
export default ownerRouter