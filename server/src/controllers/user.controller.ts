import { Request, Response } from "express";
import User from "../models/user.model.js";

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.user.id

        const user = await User.findById(id).select("-password");

        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        res.status(200).json({
            message: "User Get",
            user
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}