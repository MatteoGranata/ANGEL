import mongoose from "mongoose";

// models/Post.js

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // fare in modo che sia diverso per tutti
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
});



export const Post = mongoose.model('Post', postSchema) 