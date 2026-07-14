import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo : {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    framName: {
        type: String,
        required: true,
    },
},{timestamps: true})

export const User = mongoose.model("User",userSchema)