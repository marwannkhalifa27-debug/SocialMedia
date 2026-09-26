import { userModel } from "../../DB/models/user.model.js"
import type { Request, Response, NextFunction } from "express"

export const findUserByEmail = async (email: string) => {
    return await userModel
        .findOne({ email })
        .select("+password")
}

export const findUserByUsername = async (username: string) => {
    return await userModel.findOne({ username })
}
export const findUserById = async (id: string) => {
    return await userModel.findById(id)
}

export const getUserData = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await findUserById(req.user!.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        return res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}