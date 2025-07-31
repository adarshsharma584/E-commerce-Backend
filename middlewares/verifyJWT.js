import jwt from"jsonwebtoken"
import {User} from "../models/user.model.js";

const verifyJWT = (req,res,next)=>{
    const token = req.cookies?.refreshToken || req.headers?.authorization?.replace("Bearer"," ");
    if(!token){
        return res.status(401).json({message:"Unauthorized token"});
    }
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user = user;
        next();
    })
}
 export {verifyJWT};