import * as env from "dotenv"
env.configDotenv()

export const port = process.env.PORT
export const mongo_uri = process.env.MONGO_URI