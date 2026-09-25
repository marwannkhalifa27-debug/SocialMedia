import mongoose from "mongoose"
import { mongo_uri } from "../config/env.config.js"

export const connectionDB = async () => {
        if (!mongo_uri) throw new Error("MongoDB URI is not defined")
        await mongoose.connect(mongo_uri)
        console.log("DB connection has been established")
}