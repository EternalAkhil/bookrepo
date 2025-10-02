import express from "express"
import User from "../models/user.model.js"

const router = express.Router()

router.get("/users",async(req,res)=>{
    try {
        const users = await User.find();
    if (users){
        return res.json(users)
    }
    } catch (error) {
        return res.status(500).json({message:error})
    }
})
router.delete("/users/:id",async(req,res)=>{
    try {
        console.log("delete called")
        const id = req.params.id;
        
        const del = await User.findByIdAndDelete(id);
    if (del){
        return res.json({msg:"deleted successfully"})
    }
    } catch (error) {
        return res.status(500).json({message:error})
    }
})

export default router;