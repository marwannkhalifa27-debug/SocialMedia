import { Router } from "express";
import { login, register } from "./auth.service.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
const authRouter = Router()

authRouter.post("/register", validate(registerSchema), register)
authRouter.post("/login", validate(loginSchema), login)


export default authRouter