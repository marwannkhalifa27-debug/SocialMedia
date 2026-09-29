import type { Response } from "express";

export abstract class BaseController{
    protected sendSuccess<T>(
        res: Response,
        data: T,
        message = "Success",
        statusCode = 200
    ): Response{
        return res.status(statusCode).json({
            success: true,
            message,
            data
        })
    }

    protected sendCreated<T>(
        res: Response,
        data: T,
        message = "Resource created successfully"
    ): Response{
        return this.sendSuccess(res, data, message, 201)
    }
}