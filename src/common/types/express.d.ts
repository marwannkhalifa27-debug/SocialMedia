import type { AppJwtPayload } from "../utils/token.utils.js"
declare global {
    namespace Express {
        interface Request {
            user?: AppJwtPayload
            file?: Express.Multer.File
        }
    }
}
export {}