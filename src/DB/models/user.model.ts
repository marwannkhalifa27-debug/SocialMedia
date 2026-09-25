import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    fullName: {
        type:String,
        required:true,
        minLength: 2,
        maxLength: 50
    },
    username: {
            type: String,
            required: true,
            unique: true,
            minLength: 8,
            maxLength: 20
        },
    age: {
        type: Number,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique:true
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
        required: true,
        select: false
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