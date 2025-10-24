import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET as string, {
            expiresIn: "1d"
        })

        res.cookie("token", token, {
            sameSite: "strict",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })

        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            message: "User Login Successfull",
            user: userData
        })
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const userRegister = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).json({
                message: "Email already taken"
            })
            return
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashPass
        })
        await user.save();

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET as string, {
            expiresIn: "1d"
        })
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })

        const { password: _, ...userData } = user.toObject();

        res.status(201).json({
            message: "User Registered Successfully",
            user: userData

        })
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const userLogout = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(400).json({
            message: "Invalid"
        })
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User Logout Successfully"
    })
    return

}