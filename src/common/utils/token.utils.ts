import jwt from "jsonwebtoken"
import { access_token_secret, refresh_token_secret } from "../../config/env.config.js"

export const generateAccessToken = (user: { _id: string; role: string }) => {
    if (!access_token_secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not configured")
    }

    return jwt.sign(
        { id:user._id, role:user.role },
        access_token_secret,
        { expiresIn:"1h" }
    )
}

export const generateRefreshToken = (user: { _id: string; role: string }) => {
    if (!refresh_token_secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not configured")
    }

    return jwt.sign(
        { id:user._id },
        refresh_token_secret,
        { expiresIn:"7d" }
    )
}

export const VerifyAccessToken = (token: string) => {
    if (!access_token_secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not configured")
    }

    return jwt.verify(token, access_token_secret)
}

export const VerifyRefreshToken = (token: string) => {
    if (!refresh_token_secret) {
        throw new Error("REFRESH_TOKEN_SECRET is not configured")
    }

    return jwt.verify(token, refresh_token_secret)
}
