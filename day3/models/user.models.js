import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: string,
            min:[10,"password must be more then 10 charectors"],
            max: 20,
            required: true
        },
        postedBy:{
            type : mongoose.Schema.Types.ObjectId,
            ref: ""
        }
    },{timestamps: true}
)

export const user = mongoose.model("User", userSchema)