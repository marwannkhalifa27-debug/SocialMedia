import type { Request, Response, NextFunction } from "express"

export const logger = async (req:Request, res:Response, next:NextFunction) => {
    console.log(`${req.originalUrl} ${req.method} ${new Date().toISOString()}`)
    next()
}