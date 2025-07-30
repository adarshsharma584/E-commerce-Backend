import express,{Router} from "express";
import {getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductsBySeller,
    getProductByName,
    getProductByCategory} from "../controllers/products.controller.js";
const router = Router();

router.post("/create",createProduct);
router.get("/all",getAllProducts);
router.get("/name/:name",getProductByName);
router.get("/category/:category",getProductByCategory);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);

export default router;
