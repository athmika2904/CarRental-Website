import express from "express";
import { protect } from "../middleware/auth.js";
import { changeToOwner } from "../controllers/ownerController.js";
 const ownerRouter=express.Router();
ownerRouter.post("/change-role",protect,changeToOwner);
export default ownerRouter