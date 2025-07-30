import User from "../models/user.model.js";

const generateRefreshAndAccessTokens = (user)=>{
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return {accessToken,refreshToken};
}

const registerUser = async(req,res)=>{
    try {
        const {fullName,email,password,role,flatNo,buildingName,street,city,state,pincode,phoneNo,country} = req.body;
        
        if(!fullName || !email || !password || !role || !flatNo || !buildingName || !street || !city || !state || !pincode || !phoneNo){
            return res.status(400).json({message:"All fields are required"});
        }

        const existedUser = await User.findOne({email});
        if(existedUser){
            return res.status(400).json({message:"User already exists"});
        }
        
        const newUser = await User.create({
            fullName,
            email,
            password,
            role,
            address: {
                flatNo,
                buildingName,
                street,
                city,
                state,
                country: country || "India",
                pincode
            },
            phoneNo
        });
        
        const {refreshToken,accessToken} = generateRefreshAndAccessTokens(newUser);
        
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure: true,
            sameSite: "none"
        });
        
        newUser.refreshToken = refreshToken;
        await newUser.save();
        
        res.status(201).json({
            message:"User created successfully!",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                address: newUser.address,
                phoneNo: newUser.phoneNo
            },
            accessToken
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const loginUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const logoutUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const getUserProfile = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const updateUserProfile = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const updateUserPassword = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const updateUserAddress = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const deleteUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

export { registerUser };