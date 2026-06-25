import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 30
    },
    description: {
        type : String,
        max: 5000
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const post = mongoose.model("Post", postSchema)