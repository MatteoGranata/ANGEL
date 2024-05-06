import mongoose from "mongoose";

const piggyBankSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameProfit: {
      type: String,
    },
    profit: [
      {
        type: Number,
      },
    ],
    nameExpense: {
      type: String,
    },
    expense: [
      {
        type: Number,
      },
    ],
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const PiggyBank = mongoose.model("PiggyBank", piggyBankSchema);
