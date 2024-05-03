import mongoose from "mongoose";
import { PiggyBank } from "../models/piggyBank.js";

export const createPiggyBank = async (req, res) => {
  const { nameProfit, profit, nameExpense, expense } = req.body;
  const userId = req.user.userId;
  try {
    const newPiggyBank = new PiggyBank({
      author: userId,
      nameProfit,
      profit,
      nameExpense,
      expense,
    });
    await newPiggyBank.save();
    res.status(201).json({ newPiggyBank });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getPiggyBanks = async (req, res) => {
  const userId = req.user.userId;
  try {
    const piggyBanks = await PiggyBank.find({ author: userId });
    res.status(200).json({ piggyBanks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updatePiggyBank = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    const piggyBank = await PiggyBank.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(piggyBank);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletePiggyBank = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    await PiggyBank.findByIdAndDelete(id);
    res.status(200).json({ message: "post eliminato con successo" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
