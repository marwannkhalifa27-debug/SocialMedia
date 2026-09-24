import type { Request, Response, NextFunction } from "express"
import { userModel } from "../../DB/models/user.model.js"

export const createUser = async (req:Request,res:Response) => {
    const { fullName , username , age , phone , sex , email , password , role , avatarUrl} = req.body
    const user = await userModel.create({ fullName , username , age , phone , sex , email , password , role , avatarUrl})

    return res.status(201).json(user)
}