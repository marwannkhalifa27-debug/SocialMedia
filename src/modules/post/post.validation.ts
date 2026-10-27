import { z } from "zod";


export const postSchema = z.object({
    content: z.string().min(1).max(100),
    media: z.enum(["image", "video"]),
    author: z.string()
})

export type postDto = z.infer<typeof postSchema>;