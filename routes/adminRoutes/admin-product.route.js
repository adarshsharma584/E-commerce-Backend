import express,{Router} from "express";
import {getAllProducts,deleteProduct,getProductById,updateProduct,getProductsBySeller,getAllCategories,getProductsByCategory,updateProductStock,updateProductImage} from "../../controllers/adminControllers/admin-product.controller.js";

import {authRole} from "../../middlewares/authRole.js";
const router = Router();
    
router.get("/all-products",authRole("admin"),getAllProducts);
router.get("/product/:product-id",authRole("admin"),getProductById);
router.put("/update/:product-id",authRole("admin"),updateProduct);
router.delete("/delete/:product-id",authRole("admin"),deleteProduct);
router.get("/products-by-seller/:seller-id",authRole("admin"),getProductsBySeller);
router.get("/all-categories",authRole("admin"),getAllCategories);
router.get("/products-by-category/:category",authRole("admin"),getProductsByCategory);
router.put("/update-stock/:product-id",authRole("admin"),updateProductStock);
router.put("/update-image/:product-id",authRole("admin"),updateProductImage);

export default router;
