import { userModel } from "../../DB/models/user.model.js"


export const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email })
}

export const findUserByUsername = async (username: string) => {
    return await userModel.findOne({ username })
}