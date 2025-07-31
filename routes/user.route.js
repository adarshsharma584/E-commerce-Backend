import express,{Router} from "express";
import {registerUser,loginUser,logoutUser,getUserProfile,updateUserProfile,updateUserPassword,updateUserAddress,deleteUser} from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/verifyJWT.js";
const router = Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",verifyJWT,logoutUser);
router.get("/profile",verifyJWT,getUserProfile);
router.put("/update-profile",verifyJWT,updateUserProfile);
router.put("/update-password",verifyJWT,updateUserPassword);
router.put("/update-address",verifyJWT,updateUserAddress);
router.delete("/delete",verifyJWT,deleteUser);

export default router;
