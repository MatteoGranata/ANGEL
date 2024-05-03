import mongoose from "mongoose";

const piggyBankSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameProfit:{
        type:String,
        required: true,
    },
    profit: [
      {
        type: Number,
      },
    ],
    nameExpense:{
        type:String,
        required: true,
    },
    expense: [
      {
        type: Number,
      },
    ],
  },
  { timestamps: true }
);

export const PiggyBank = mongoose.model("PiggyBank", piggyBankSchema);
