import mongoose from "mongoose";
import { Post } from "../models/post.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;
  try {
    const post = new Post({
      author: userId,
      content,
    });

    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const userId = req.user.userId;
  try {
    const posts = await Post.find({ author: userId });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "post eliminato con successo" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
