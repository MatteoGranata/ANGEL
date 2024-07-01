import mongoose, { SchemaType } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true }
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
