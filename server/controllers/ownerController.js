import user from "../models/User";

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