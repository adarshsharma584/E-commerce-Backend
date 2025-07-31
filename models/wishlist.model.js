import mongoose,{Schema} from "mongoose";

const wishlistSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:"Product"
        }
    }]
},{
    timestamps:true
});

export const Wishlist = mongoose.model("Wishlist",wishlistSchema);
