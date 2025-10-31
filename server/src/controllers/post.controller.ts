import { Request, Response } from "express";
import Post from "../models/post.modet.js";
import { fetchMetadata } from "../utils/index.js";

export const createPost = async (req: Request, res: Response) => {
    try {
        const { url, tags } = req.body;
        const userId = req.user.id

        const data = await fetchMetadata(url);


        if (data.publisher === "X (formerly Twitter)") {
            data.image = "https://tse2.mm.bing.net/th/id/OIP.haaoLPYGwnAxBXyelWH_VAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        }

        const post = new Post({
            title: data.title,
            description: data.description,
            url,
            thumbnail: data.image,
            type: data.publisher,
            htmlContent: data.iframe,
            user: userId,
            tags,
        })

        await post.save()
        post.populate("user", "_id username");

        res.status(201).json({
            message: "Post Created Successfully",
            post
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAllUserPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const posts = await Post.find({ user: userId }).populate("user", "_id username");

        res.status(200).json({
            message: "All User Posts",
            posts
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const searchPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const { q } = req.query;

        if (!q || typeof q !== 'string' || q.trim() === "") {
            res.status(400).json({
                message: "Query required"
            })
            return
        }

        const posts = await Post.find({
            user: userId,
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { tags: { $regex: q, $options: "i" } },
                { type: { $regex: q, $options: "i" } },
            ]
        })

        res.status(200).json({
            message: "Posts feteched successfully",
            posts
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}