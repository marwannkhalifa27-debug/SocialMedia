import type { Request, Response ,NextFunction } from "express"
import { userModel } from "../../DB/models/user.model.js"
import { findUserByEmail, findUserByUsername } from "../user/user.service.js"
import bcrypt from "bcrypt"



export const register = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { fullName, username, email, password, sex, age, phone } = req.body

        const exists = await findUserByEmail(email) || await findUserByUsername(username)
        if(exists){
            return res.status(409).json({message:"Email or username is already used"})
        }

        const hashed = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            fullName, username, email, password:hashed, sex, age, phone
        })
        return res.status(201).json({
            message:"User created",
            data: {
                id:user._id,
                fullName:user.fullName,
                username:user.username,
                email:user.email,
                sex:user.sex,
                age:user.age,
                phone:user.phone,
                role:user.role
            }
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    
}