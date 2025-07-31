import express,{Router} from "express";
import {getAllOrders,deleteOrder,updateUsersOrderStatus,getUserOrders,getOrderById} from "../../controllers/adminControllers/admin-order.controller.js";

import {authRole} from "../../middlewares/authRole.js";
const router = Router();


router.get("/all-orders",authRole("admin"),getAllOrders);
router.get("/order/:order-id",authRole("admin"),getOrderById);
router.put("/update/:order-id",authRole("admin"),updateUsersOrderStatus);
router.delete("/delete/:order-id",authRole("admin"),deleteOrder);
router.get("/user/:user-id",authRole("admin"),getUserOrders);

export default router;
