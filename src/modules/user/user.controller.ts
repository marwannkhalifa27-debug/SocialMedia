

import { Router } from "express";
import { getUserData } from "./user.service.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
const userRouter = Router()

userRouter.get("/me", authenticate, getUserData)

export default userRouter