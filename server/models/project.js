import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "username",
      required: true,
    },
    name: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    piggyBanks: [{ type: mongoose.Schema.Types.ObjectId, ref: "piggyBank" }],
    passwords: [{ type: mongoose.Schema.Types.ObjectId, ref: "password" }],
    timers: [{ type: mongoose.Schema.Types.ObjectId, ref: "timer" }],
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
