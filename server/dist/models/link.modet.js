import mongoose, { Schema } from "mongoose";
const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: String,
    description: String,
    author_name: String,
    type: String,
    thumbnail: String,
    provider_name: String,
    content: String, // html content
});
