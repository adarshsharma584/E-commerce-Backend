import {Product} from "../../models/product.model.js";

const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({message:"Products fetched successfully",products});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteProduct = async (req,res)=>{
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        await product.remove();
        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getProductById = async (req,res)=>{
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product fetched successfully",product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateProduct = async (req,res)=>{
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId,req.body,{new:true});
        res.status(200).json({message:"Product updated successfully",updatedProduct});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getProductsBySeller = async (req,res)=>{
    try {
        const sellerId = req.params.id;
        if(!sellerId){
            return res.status(400).json({message:"Seller ID is required"});
        }
        const products = await Product.find({seller:sellerId});
        if(!products){
            return res.status(404).json({message:"Products not found"});
        }
        res.status(200).json({message:"Products fetched successfully",products});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//category controllers

const getAllCategories = async (req,res)=>{
    try {
        const categories = await Product.distinct("category");
        res.status(200).json({message:"Categories fetched successfully",categories});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getProductsByCategory = async (req,res)=>{
    try {
        const category = req.params.category;
        if(!category){
            return res.status(400).json({message:"Category is required"});
        }
        const products = await Product.find({category:category});
        if(!products){
            return res.status(404).json({message:"Products not found"});
        }
        res.status(200).json({message:"Products fetched successfully",products});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateProductStock = async (req,res)=>{
    try {
        const productId = req.params.id;
        const {stock} = req.body;
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        if(!stock){
            return res.status(400).json({message:"Stock is required"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId,{stock:stock},{new:true});
        res.status(200).json({message:"Product updated successfully",updatedProduct});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateProductImage = async (req,res)=>{
    try {
        const productId = req.params.id;
        const {image} = req.body;
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        if(!image){
            return res.status(400).json({message:"Image is required"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId,{image:image},{new:true});
        res.status(200).json({message:"Product updated successfully",updatedProduct});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}



export {getAllProducts,deleteProduct,getProductById,updateProduct,getProductsBySeller,getAllCategories,getProductsByCategory,updateProductStock,updateProductImage};
