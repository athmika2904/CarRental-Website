import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
const app=express();
await connectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req, res)=>res.send("Server is running"));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))