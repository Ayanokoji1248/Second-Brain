var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
            return;
        }
        const validPass = yield bcrypt.compare(password, user.password);
        if (!validPass) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
            return;
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.cookie("token", token, {
            sameSite: "strict",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(200).json({
            message: "User Login Successfull",
            user: userData
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
export const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userExist = yield User.findOne({ email });
        if (userExist) {
            res.status(400).json({
                message: "Email already taken"
            });
            return;
        }
        const hashPass = yield bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashPass
        });
        yield user.save();
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(201).json({
            message: "User Registered Successfully",
            user: userData
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
export const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.status(400).json({
            message: "Invalid"
        });
    }
    res.clearCookie("token");
    res.status(200).json({
        message: "User Logout Successfully"
    });
    return;
});
