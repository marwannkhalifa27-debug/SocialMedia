import express from "express"
import type { Request, Response} from "express"
import { port } from "./config/env.config.js"

const app = express()

export const bootstrap = async () => {
    app.use(express.json())

    app.get("/", (req:Request, res:Response) => {
        res.status(200).json({message:"Hello there"})
    })

    app.listen(port, () => console.log(`Server is running on port ${port}`))
}