import express,{Router} from "express";
import {getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductsBySeller,
    getProductByName,
    getProductByCategory} from "../controllers/products.controller.js";
const router = Router();
import {authRole} from "../middlewares/authRole.js";

router.get("/all",getAllProducts);
router.get("/name/:name",getProductByName);
router.get("/category/:category",getProductByCategory);
router.post("/create",authRole("seller"),createProduct);
router.put("/update/:id",authRole("seller"),updateProduct);
router.delete("/delete/:id",authRole("seller"),deleteProduct);
router.get("/seller/:id",authRole("seller"),getAllProductsBySeller);

export default router;
