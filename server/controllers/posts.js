import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { Post } from "../models/post.js"
import { User } from "../models/user.js"
// const Post = require('../models/post.js');




export const createPost = async (req, res) => {
    const { content } = req.body;
    // const userId = {...req.username}
    const userId = req.user.userId;

    const post = new Post({
        author: userId,
        content,
    });

    await post.save();

    res.status(201).json({ post });
};

export const getPosts = async (req, res) => {
    const userId = req.user.userId;

    const posts = await Post.find({ author: userId });

    res.status(200).json({ posts });
};

// const updatePost = async (req, res) => {
//     const { content } = req.body;
//     const postId = req.params.id;
//     const userId = req.user.userId;

// }
export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'id non conforme con mongo' })
    try {
        await Post.findByIdAndDelete(id)
        res.status(200).json({ message: 'post eliminato con successo' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}