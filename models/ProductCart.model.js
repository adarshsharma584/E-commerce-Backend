import mongoose,{Schema } from "mongoose";

const productCartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

export default mongoose.model("ProductCart",productCartSchema);