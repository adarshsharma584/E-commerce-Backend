import User from "../models/user.model.js";

const generateRefreshAndAccessTokens = (user)=>{
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return {accessToken,refreshToken};
}

const registerUser = async(req,res)=>{
    try {
        const {fullName,email,password,role,flatNo,buildingName,street,city,state,pincode,phoneNo,country,profilePicture} = req.body;
        
        if(!fullName || !email || !password || !role || !flatNo || !buildingName || !street || !city || !state || !pincode || !phoneNo || !country || !profilePicture){
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
            phoneNo,
            profilePicture
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
                phoneNo: newUser.phoneNo,
                profilePicture: newUser.profilePicture
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
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({message:"All fields are required"});
        }
        const existedUser = await User.findOne({email});
        if(!existedUser){
            res.status(404).json({message:"User not found"});
        }
        const isPasswordMatched = await existedUser.comparePassword(password);
        if(!isPasswordMatched){
            res.status(401).json({message:"Invalid credentials"});
        }
        const {refreshToken,accessToken} = generateRefreshAndAccessTokens(existedUser);
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        });
        existedUser.refreshToken = refreshToken;
        await existedUser.save();

        res.status(200).json({
            message:"User logged in successfully",
            user:
            {
                id:existedUser._id,
                fullName:existedUser.fullName,
                email:existedUser.email,
                role:existedUser.role,
                phoneNo:existedUser.phoneNo,
                profilePicture:existedUser.profilePicture
            },  
            accessToken});
        
    } catch (error) {
        console.error("Login error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const logoutUser = async(req,res)=>{
    try {
        const user = req.user;
        console.log(user);
        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }
        res.clearCookie("refreshToken");
        user.refreshToken = "";
        await user.save();
        res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        console.error("Logout error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const getUserProfile = async(req,res)=>{
    try {
        const user =req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }

        res.status(200).json({message:"User profile fetched successfully",user:{
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            role:user.role,
            phoneNo:user.phoneNo,
            profilePicture:user.profilePicture
        }});
    } catch (error) {
        console.error("Get user profile error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const updateUserProfile = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }
        const {fullName,email,phoneNo,profilePicture} = req.body;
        console.log(req.body);
        
        if(!fullName || !email || !phoneNo || !profilePicture){
            return res.status(400).json({message:"All fields are required"});
        }
         await User.findByIdAndUpdate(user._id,{fullName,email,phoneNo,profilePicture},{new:true});

        const newUpdatedUser = User.findById(user._id);

        if(!newUpdatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User profile updated successfully",newUpdatedUser});

    } catch (error) {
        console.error("Update user profile error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const updateUserPassword = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }

        const {password} = req.body;

        if(!password){
            return res.status(400).json({message:"Password is required"});
        };

        const updatedUser = await User.findByIdAndUpdate(user._id,{password},{new:true});

        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        };

        res.status(200).json({message:"User password updated successfully",updatedUser});

    } catch (error) {
        console.error("Update user password error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const updateUserAddress = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }
        const {flatNo,buildingName,street,city,state,pincode,country} = req.body;
        if(!flatNo || !buildingName || !street || !city || !state || !pincode || !country){
            return res.status(400).json({message:"Address is required"});
        }
        const updatedUserAddress = await User.findByIdAndUpdate(user._id,{address:{flatNo,buildingName,street,city,state,pincode,country}},{new:true});
        if(!updatedUserAddress){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User address updated successfully",updatedUserAddress});
    } catch (error) {
        console.error("Update user address error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const deleteUser = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }
        await user.remove();
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        console.error("Delete user error:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export { registerUser,loginUser,logoutUser,getUserProfile,updateUserProfile,updateUserPassword,updateUserAddress,deleteUser };