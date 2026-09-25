import "dotenv/config"

export const port = Number(process.env.PORT ?? 3000)
export const mongo_uri = process.env.MONGO_URI
export const access_token_secret = process.env.ACCESS_TOKEN_SECRET
export const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET