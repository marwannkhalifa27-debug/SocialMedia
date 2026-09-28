import z from "zod";


export const updateSchema = z.object(
    {
        fullName:z.string().optional(),
        username:z.string().optional(),
        age:z.number().optional(),
        phone:z.number().optional()
    }
).strict()