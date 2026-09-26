import type { Request, Response, NextFunction } from "express"
import type { JwtPayload } from "jsonwebtoken"
import { VerifyAccessToken } from "../utils/token.utils.js"

export const authenticate = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"No token provided or invalid format"})
    }

    const token = authHeader?.split(" ")[1]

    if(!token){
        return res.status(401).json({message:"Token missing"})
    }
    try {
        const decoded = VerifyAccessToken(token)
        req.user = decoded as JwtPayload
        next()
    } catch (error) {
        next(error)
    }
}