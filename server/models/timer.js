import mongoose from "mongoose";

const timerSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nome: {
      type: String,
    },
    tempo: {
      type: Number,
      default: 0,
    },
    attivo: {
      type: Boolean,
    },
    intervallo: {
      type: Number,
      default: 1000,
    },
  },
  { timestamps: true }
);

export const Timer = mongoose.model("Timer", timerSchema);
