import type { Request, Response ,NextFunction } from "express"
import { userModel } from "../../DB/models/user.model.js"
import { findUserByEmail, findUserByUsername } from "../user/user.service.js"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../common/utils/token.utils.js"



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

        const accessToken = generateAccessToken({ _id: user._id.toString(), role: user.role })
        const refreshToken = generateRefreshToken({ _id: user._id.toString(), role: user.role })
        
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
            },
            tokens: {
                accessToken:accessToken,
                refreshToken:refreshToken
            }
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email , password } = req.body
        const user = await findUserByEmail(email)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const accessToken = generateAccessToken({ _id: user._id.toString(), role: user.role })
        const refreshToken = generateRefreshToken({ _id: user._id.toString(), role: user.role })

        return res.status(200).json({
            message:"Login successfully",
            tokens: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })
    } catch (error) {
        next(error)
    }
}