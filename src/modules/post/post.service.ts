import { AppError } from "../../common/errors/app.error.js";
import { postModel } from "../../DB/models/post.model.js";
import { userService } from "../user/user.service.js";
import type { postDto } from "./post.validation.js";


export class PostService{
    constructor(
    )
    {}

    public async findPostById(id: any){
        await postModel.findById(id)
    }

    public async createPost(dto: postDto){
        const { content, media, author } = dto
        const exists = await userService.findUserByUsername(author)

        if(!exists){
            throw AppError.notFound("User not found")
        }

        const post = await postModel.create({
            content,
            media: media ? [{ url: media }] : [],
            author
        })

        return {
            post: post
        }
    }
    
    public async deletePost(id: any){
        
        const deletedPost = await postModel.findOneAndDelete(id)
        return {
            deletedPost
        }
    }
}

export const postService = new PostService()