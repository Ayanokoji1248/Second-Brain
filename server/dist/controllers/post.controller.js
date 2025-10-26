var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Post from "../models/post.modet.js";
import { fetchMetadata } from "../utils/index.js";
export const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, tags } = req.body;
        const userId = req.user.id;
        const data = yield fetchMetadata(url);
        const post = new Post({
            title: data.title,
            description: data.description,
            url,
            thumbnail: data.image,
            type: data.publisher,
            htmlContent: data.iframe,
            user: userId,
            tags,
        });
        yield post.save();
        post.populate("user", "_id username");
        res.status(201).json({
            message: "Post Created Successfully",
            post
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
export const getAllUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const posts = yield Post.find({ user: userId }).populate("user", "_id username");
        res.status(200).json({
            message: "All User Posts",
            posts
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
