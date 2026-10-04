import { userModel } from "../../DB/models/user.model.js"
import { AppError } from "../../common/errors/app.error.js"
import type { Request, Response, NextFunction } from "express"


export interface updateUserDto {
    fullName?: string,
    username?: string
    age?:number,
    phone?:string
}

export class UserService {
    public async findUserByEmail(email: string){
        return await userModel
            .findOne({ email })
            .select("+password")
    }
    public async findUserByUsername(username: string){
        return await userModel.findOne({ username })
    }
    public async findUserById(id: string){
        const user = await userModel.findById(id)    
        if(!user){
            throw AppError.notFound("User not found")
        }
        return user
    }
    public async updateUser(id: string, updateData: updateUserDto){
        const updatedUser = await userModel.findByIdAndUpdate(id, updateData,{
            new: true,
            runValidators: true
        })
        if(!updatedUser){
            throw AppError.notFound("User not found")
        }
        return updatedUser
    }
    public async updateAvatar(id: string, avatarUrl: string){

        if(!req.file){
            throw AppError.notFound("No file provided")
        }

        const user = await userModel.findByIdAndUpdate(req.user?.id, { avatarUrl: req.file.path}, {new: true})
        return user
    }
}
export const userService = new UserService()