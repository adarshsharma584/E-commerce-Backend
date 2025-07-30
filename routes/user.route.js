import express,{Router} from "express";
import {registerUser,loginUser,logoutUser,getUserProfile,updateUserProfile,updateUserPassword,updateUserAddress,deleteUser} from "../controllers/user.controller.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/profile",getUserProfile);
router.put("/update-profile",updateUserProfile);
router.put("/update-password",updateUserPassword);
router.put("/update-address",updateUserAddress);
router.delete("/delete",deleteUser);

export default router;
