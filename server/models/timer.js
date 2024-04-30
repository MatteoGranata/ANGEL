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
    },
    attivo: {
      type: Boolean,
    },
    intervallo: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Timer = mongoose.model("Timer", timerSchema);
