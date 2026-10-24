import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    content: {
        type: String,
        trim: true,
        maxlength: 5000
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    media: [{
        url: String,
        type: {
            type: String,
            enum: ["image", "video"]
        }
    }]
},
{
    timestamps: true
})


export const postModel = mongoose.model("post", postSchema)