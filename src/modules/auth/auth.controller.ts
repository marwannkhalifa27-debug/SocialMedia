import { Router } from "express";
import { register } from "./auth.service.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { registerSchema } from "./auth.validation.js";
const authRouter = Router()

authRouter.post("/register", validate(registerSchema), register)

export default authRouter