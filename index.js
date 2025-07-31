import dotenv from "dotenv";

dotenv.config({path: "./config.env"});

//imports

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/dbConnect.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import adminUserRouter from "./routes/adminRoutes/admin-user.route.js";
import adminProductRouter from "./routes/adminRoutes/admin-product.route.js";
import adminOrderRouter from "./routes/adminRoutes/admin-order.route.js";


//Main Content
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Our API")
});

//Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/admin-user",adminUserRouter);
app.use("/api/v1/admin-product",adminProductRouter);
app.use("/api/v1/admin-order",adminOrderRouter);


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));