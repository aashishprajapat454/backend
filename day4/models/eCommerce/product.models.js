import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    discription:{
        type : String,
        requierd: true
    },
    name : {
        type : String,
        requierd: true
    },
    price:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    category:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


},{timestamps: true})

export const Product = mongoose.model("Product", productSchema)