import mongoose from "mongoose";
import { Password } from "../models/password.js";

export const createPassword = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;
  try {
    const password = new Password({
      author: userId,
      content,
    });

    await password.save();

    res.status(201).json({ password });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getAllPasswords = async (req, res) => {
  const userId = req.user.userId;

  try {
    const passwords = await Password.find({ author: userId });
    res.status(200).json({ passwords });
  } catch (error) {
    restart.status(404).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    const password = await Password.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(password);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletePassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    await Password.findByIdAndDelete(id);
    res.status(200).json({ message: "password eliminata con successo" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
