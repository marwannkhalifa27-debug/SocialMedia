import multer from "multer"
import type { FileFilterCallback } from "multer"
import fs from "fs"
import path from "path"
import type { Request } from "express"

const uploadDir = "uploads/images"
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true})
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${req.user?.id}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

const fileFilter = (req: Request,file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

export default upload