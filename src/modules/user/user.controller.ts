

import { Router } from "express";
import { getUserData, updateUser } from "./user.service.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { updateSchema } from "./user.validation.js";
const userRouter = Router()

userRouter.get("/me", authenticate, getUserData)
userRouter.patch("/me", authenticate, validate(updateSchema), updateUser)


export default userRouter