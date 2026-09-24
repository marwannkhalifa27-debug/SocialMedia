import "dotenv/config"

export const port = Number(process.env.PORT ?? 3000)
export const mongo_uri = process.env.MONGO_URI