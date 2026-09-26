

import { Router } from "express";
import { getUserData, updateUser } from "./user.service.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
const userRouter = Router()

userRouter.get("/me", authenticate, getUserData)
userRouter.patch("/me", authenticate, updateUser)


export default userRouter