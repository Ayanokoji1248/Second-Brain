import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import { createPost } from "../controllers/post.controller.js";
const postRouter = Router();
postRouter.post("/create", userMiddleware, createPost);
export default postRouter;
