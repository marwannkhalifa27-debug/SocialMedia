import z from "zod";


export const updateSchema = z.object(
    {
        fullName:z.string().min(2).max(50).optional(),
        username:z.string().min(8).max(20).trim().toLowerCase().optional(),
        age:z.number().min(18).max(60).optional(),
        phone:z.string().optional()
    }
).strict()