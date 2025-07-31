import {Wishlist} from "../models/wishlist.model.js";



const addProductToWishlist = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {productId} = req.params;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        const wishlist = await Wishlist.findOne({user:userId});
        if(!wishlist){
            const newWishlist = new Wishlist({user:userId,products:[{product:productId}]});
            await newWishlist.save();
            return res.status(200).json({message:"Product added to wishlist successfully",wishlist});
        }
        if(wishlist.products.length === 0){
            return res.status(404).json({message:"Wishlist is empty"});
        }
        const product = wishlist.products.find((product)=>product.product.toString() === productId);
        if(product){
            return res.status(400).json({message:"Product already added to wishlist",wishlist});
        }
        wishlist.products.push({product:productId});
        await wishlist.save();
        return res.status(200).json({message:"Product added to wishlist successfully",wishlist});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const removeProductFromWishlist = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {productId} = req.params;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        const wishlist = await Wishlist.findOne({user:userId});
        if(!wishlist){
            return res.status(404).json({message:"Wishlist not found"});
        }
        if(wishlist.products.length === 0){
            return res.status(404).json({message:"Wishlist is empty"});
        }
        const product = wishlist.products.find((product)=>product.product.toString() === productId);
        if(!product){
            return res.status(404).json({message:"Product not found in wishlist"});
        }
        wishlist.products.pull(product);
        await wishlist.save();
        return res.status(200).json({message:"Product removed from wishlist successfully",wishlist});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getAllProductsFromWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
      const wishlist = await Wishlist.findOne({ user: userId }).populate('products.product');
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      res.status(200).json({ wishlist });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };