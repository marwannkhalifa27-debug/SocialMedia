import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    fullName: {
        type:String,
        required:true,
        min: 2,
        max: 20
    },
    username: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        sex: {
            type: String,
            enum: ["male", "female"],
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: { 
            type: String, 
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        avatarUrl: {
            type: String
        }, 
        isVerified: {
            type: Boolean,
            default: false
        }
},
{
    timestamps:true
})
export const userModel = mongoose.model("user", userSchema)