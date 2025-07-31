import {User} from "../../models/user.model.js";

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({message:"Users fetched successfully",users});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteUser = async (req,res)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            res.status(400).json({
                message:"User ID is required",
            });
        }
        const user = await User.findByIdAndDelete(userId);
        res.status(200).json({message:"User deleted successfully",user});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getUserById = async (req,res)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        if(!ObjectId.isValid(userId)){
            return res.status(400).json({message:"Invalid user ID"});
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User fetched successfully",user});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateUserRole = async (req,res)=>{
    try {
        const {role}=req.body;
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        if(!role){
            return res.status(400).json({message:"Role is required"});
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{role},{new:true});
        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(
            {message:"User role updated successfully",updatedUser});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export {getAllUsers,deleteUser,getUserById,updateUserRole};

