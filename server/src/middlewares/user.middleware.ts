import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string,
                email: string
            }
        }
    }
}

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({
                message: "No Token Provided"
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

        req.user = {
            id: decoded.id as string,
            email: decoded.email as string
        }

        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export default userMiddleware