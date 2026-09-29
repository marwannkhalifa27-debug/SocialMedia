import { Router, type Request, type Response, type NextFunction } from "express";
import { BaseController } from "../../common/controllers/base.js";
import { AuthService } from "./auth.service.js";
import { userService } from "../user/user.service.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

export class AuthController extends BaseController {
  public router: Router;

  constructor(private readonly authService: AuthService) {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/register",
      validate(registerSchema),
      this.register.bind(this)
    );
    this.router.post("/login", validate(loginSchema), this.login.bind(this));
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.authService.register(req.body);
      this.sendCreated(res, result, "User registered successfully");
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.authService.login(req.body);
      this.sendSuccess(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  };
}

const authService = new AuthService(userService);
export const authController = new AuthController(authService);
export default authController.router;