import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import { getUser } from "../controllers/user.controller.js";
const userRouter = Router();
userRouter.get('/me', userMiddleware, getUser);
export default userRouter;
