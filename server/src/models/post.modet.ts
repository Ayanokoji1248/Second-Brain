import mongoose, { model, Schema } from "mongoose";

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: String, // title of post
    description: String, // description about articles
    type: String, // youtube twitter etc // publisher
    thumbnail: String, // thumbnail for youtube
    htmlContent: String,
    tags: {
        type: [String], // user fill
        default: []
    }
}, { timestamps: true })

const Post = model("post", postSchema);

export default Post