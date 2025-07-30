import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:[String],
    seller:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

export default mongoose.model("Product",productSchema);