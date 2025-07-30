import {Product} from "../models/product.model.js";

const getAllProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        if(!products){
            return res.status(404).json({message:"No products found"});
        }
        res.status(200).json({
            message:"Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

const getProductByName   = async(req,res)=>{
    try {
        const productName = req.params.name;    
        const product = await Product.findOne({name:productName});

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({
            message:"Product fetched successfully",
            product
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
};

const createProduct = async(req,res)=>{
    try {
        const {
            name,
            description,
            price,
            stock,
            category,
            images,
            seller
        } = req.body;

        if(!name || !description || !price || !stock || !category || !images || !seller){
            return res.status(400).json({message:"All fields are required"});
        }
        const existedProduct = await Product.findOne({name});
        if(existedProduct){
            return res.status(400).json({message:"Product already exists"});
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            images,
            seller
        });
        res.status(201).json({
            message:"Product created successfully",
            product:newProduct
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
};

const updateProduct = async(req,res)=>{
    try {
        const {name,description,price,stock,category,images,seller} = req.body;
        const productId = req.params.id;
        if(!name || !description || !price || !stock || !category || !images || !seller)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const updateProduct = await Product.findByIdAndUpdate(productId,{name,description,price,stock,category,images,seller},{new:true});

        if(!updateProduct){
            return res.status(404).json({message:"Product not found"});
        }
        
        res.status(200).json({
            message:"Product updated successfully",
            product:updateProduct
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

const deleteProduct = async(req,res)=>{
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
        res.status(500).json({message:"Internal server error"});
    }
}

const getAllProductsBySeller = async(req,res)=>{
    try {
        const seller = req.user;
        if(!seller){
            return res.status(401).json({message:"Unauthorized user"});
        }
        const products = await Product.find({seller});
        if(!products){
            return res.status(404).json({message:"No products found"});
        }
        res.status(200).json({
            message:"Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

const getProductByCategory = async(req,res)=>{
    try {
        const category = req.params.category;
        if(!category){
            return res.status(400).json({message:"Category is required"});
        }
        const products = await Product.find({category});
        if(!products){
            return res.status(404).json({message:"No products found"});
        }
        res.status(200).json({
            message:"Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductsBySeller,
    getProductByName,
    getProductByCategory
};

