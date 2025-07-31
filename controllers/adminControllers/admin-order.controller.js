import {Order} from "../../models/order.model.js"

const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find();
        if(!orders){
            return res.status(404).json({message:"Orders not found"});
        }
        if(!orders.length){
            return res.status(404).json({message:"No orders available"});
        }
        res.status(200).json({message:"Orders fetched successfully",orders});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getOrderById = async (req,res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(400).json({message:"Order ID is required"});
        }
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json({message:"Order fetched successfully",order});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateUsersOrderStatus = async (req,res)=>{
    try {
        const userId = req.params.userId;
        const orderId = req.params.id;
        const {status} = req.body;
        if(!orderId){
            return res.status(400).json({message:"Order ID is required"});
        }
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        const order = await Order.findById(userId);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        const updatedOrder = await Order.findByIdAndUpdate(userId,{status},{new:true});
        if(!updatedOrder){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json({message:"Order updated successfully",updatedOrder});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteOrder = async (req,res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(400).json({message:"Order ID is required"});
        }
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        await order.remove();
        res.status(200).json({message:"Order deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getUserOrders = async (req,res)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        const orders = await Order.find({user:userId});
        if(!orders){
            return res.status(404).json({message:"Orders not found"});
        }
        res.status(200).json({message:"Orders fetched successfully",orders});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export {getAllOrders,getOrderById,updateUsersOrderStatus,deleteOrder,getUserOrders};

