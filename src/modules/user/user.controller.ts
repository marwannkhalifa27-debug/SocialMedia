

import { Router, type Request, type Response, type NextFunction } from "express";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { updateSchema } from "./user.validation.js";
import { BaseController } from "../../common/controllers/base.js";
import { userService, type UserService } from "./user.service.js";
import { AppError } from "../../common/errors/app.error.js";
import upload from "../../common/middleware/upload.middleware.js";


export class UserController extends BaseController{
    public router: Router

    constructor(private readonly userService: UserService){
        super()
        this.router = Router()
        this.initializeRoutes()
    }
    private initializeRoutes(): void{
        this.router.get("/me", authenticate, this.getProfile.bind(this));
        this.router.patch("/me", authenticate, validate(updateSchema), this.updateProfile.bind(this))
        this.router.patch("/me/avatar", authenticate, upload.single("avatar"), this.updateAvatar.bind(this))
    }

    public getProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
        const user = await this.userService.findUserById(req.user!.id);
        this.sendSuccess(res, user, "User profile retrieved successfully");
        } catch (error) {
        next(error);
        }
    };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const updatedUser = await this.userService.updateUser(
        req.user!.id,
        req.body
      );
      this.sendSuccess(res, updatedUser, "User profile updated successfully");
    } catch (error) {
      next(error);
    }
  };
  public updateAvatar = async(
    req:Request,
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file) {
        throw AppError.badRequest("No file provided")
      }
      if (!req.user?.id) {
        throw AppError.unauthorized("Unauthorized")
      }

      const user = await this.userService.updateAvatar(
        req.user.id,
        req.file.path
      )
      this.sendSuccess(res, user, "User avatar has been changed succussfully")
    } catch (error) {
      next(error)
    }
  }
}
export const userController = new UserController(userService);
export default userController.router;