import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../../common/controllers/base.js";
import type { PostService } from "./post.service.js";
import { postSchema } from "./post.validation.js";
import { validate } from "../../common/middleware/validation.middleware.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";




export class PostController extends BaseController{
    public router: Router
    constructor(private readonly postService: PostService){
        super()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(
            "/post",
            authenticate,
            validate(postSchema),
            this.addPost.bind(this)
        )
        this.router.delete(
            "/:id",
            authenticate,
            this.addPost.bind(this)
        )
    }


    public addPost = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const result = await this.postService.createPost(req.body)
            this.sendCreated(res, result, "Post added successfully")
        } catch (error) {
            next(error)
        }
    }

    public deletePost = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const result = await this.postService.deletePost(req.params.id)
            this.sendSuccess(res, result, "Deleted successfully")
        } catch (error) {
            next(error)
        }
    }
}