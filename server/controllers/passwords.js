import mongoose from 'mongoose';
import { Password } from '../models/password.js';
import { Project } from '../models/project.js';

export const createPassword = async (req, res) => {
  const userId = req.user.userId;
  try {
    const password = new Password({
      author: userId,
      ...req.body,
    });
    await password.save();
    await Project.findByIdAndUpdate(password.projectId, {
      $push: { passwords: password._id },
    });
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

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'id not compliant with mongo' });
  try {
    const password = await Password.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ password });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletePassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'id not compliant with mongo' });
  try {
    await Password.findByIdAndDelete(id);
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
