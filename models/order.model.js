import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
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
    },
    paymentId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    }
},{
    timestamps:true
});

export const Order = mongoose.model("Order",orderSchema);
