import express,{Router} from "express";

import {getAllUsers,deleteUser,getUserById,updateUserRole} from "../../controllers/adminControllers/admin-user.controller.js";

import {authRole} from "../../middlewares/authRole.js";
const router = Router();

router.get("/all-users",authRole("admin"),getAllUsers);
router.get("/user/:user-id",authRole("admin"),getUserById);
router.put("/update/:user-id",authRole("admin"),updateUserRole);
router.delete("/delete/:user-id",authRole("admin"),deleteUser);

export default router;