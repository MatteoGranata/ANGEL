import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postContent: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    pin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
