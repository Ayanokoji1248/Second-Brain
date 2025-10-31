import { Router } from "express"
import userMiddleware from "../middlewares/user.middleware.js";
import { createPost, deletePost, getAllUserPost, searchPost } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.get('/all', userMiddleware, getAllUserPost)

postRouter.post("/create", userMiddleware, createPost)

postRouter.get('/search', userMiddleware, searchPost);

postRouter.delete('/delete/:id', userMiddleware, deletePost)

export default postRouter;