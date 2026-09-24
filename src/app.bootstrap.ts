import express from "express"
import type { Request, Response, NextFunction } from "express"
import { port } from "./config/env.config.js"
import { connectionDB } from "./DB/connectionDB.js"
import { logger } from "./common/middleware/logger.middleware.js"
import userRouter from "./modules/user/user.controller.js"

export const bootstrap = async () => {
    const app = express()
    await connectionDB()

    app.use(express.json())
    app.use(logger)

    app.use("/user", userRouter)

    app.get("/", (req:Request, res:Response) => {
        res.status(200).json({message:"Hello there"})
    })
    app.use((_req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found" })
    })
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    })

    app.listen(port, () => console.log(`Server is running on port ${port}`))
}