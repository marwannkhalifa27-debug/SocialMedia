import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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
            maxLength: 20,
            trim: true,
            lowercase:true 
        },
    age: {
        type: Number,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    sex: {
        type: String,
        enum: ["male", "female"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true 
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

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.post("save", function (doc){
    console.log(`New user created: ${doc.username}`)
})


export const userModel = mongoose.model("user", userSchema)