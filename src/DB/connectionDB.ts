import mongoose from "mongoose";
import { mongo_uri } from "../config/env.config.js";

export class Database {
    private static instance: Database;
    private isConnected = false

    private constructor() {}
    public static getInstance(): Database{
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }

    public async connect(): Promise<void>{
        if(this.isConnected){
            console.log("Database is already connected")
            return
        }
        if(!mongo_uri){
            throw new Error("MongoDB URI is not defined in environment variables.");
        }
        await mongoose.connect(mongo_uri)
        this.isConnected = true
        console.log("DB connection has been established successfully.");
    }
}