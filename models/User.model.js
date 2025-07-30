import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addressSchema = new mongoose.Schema(
    {
        flatNo:{
            type:String,
            required:true
        },
        buildingName:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        }
    }
)

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            select:false,
        },
        role:{
            type:String,
            enum:["seller","buyer","admin"],
            default:"buyer"
        },
        profilePicture:{
            type:String,
            default:""
        },
        phoneNo:{
            type:Number,
            required:true
        },
        refreshToken:{
            type:String,
            default:"",
            
            select:false,
        },
        address:[addressSchema],

    },{
        timestamps:true,
    }
)

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id:this._id,
        fullName:this.fullName,
        email:this.email,
        role:this.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"});
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
}

export default mongoose.model("User",userSchema);