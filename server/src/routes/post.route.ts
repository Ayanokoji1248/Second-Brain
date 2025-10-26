import { Router } from "express"
import userMiddleware from "../middlewares/user.middleware.js";
import { createPost, getAllUserPost } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.get('/all', userMiddleware, getAllUserPost)

postRouter.post("/create", userMiddleware, createPost)

export default postRouter;