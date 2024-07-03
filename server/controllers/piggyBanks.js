import mongoose from 'mongoose';
import { Expense } from '../models/expense.js';
import { Profit } from '../models/profit.js';
import { Project } from '../models/project.js';

export const createExpense = async (req, res) => {
  const userId = req.user.userId;
  try {
    const expense = new Expense({
      author: userId,
      ...req.body,
    });
    await expense.save();
    const project = await Project.findByIdAndUpdate(
      expense.projectId,
      {
        $push: { 'piggyBanks.expenses': expense._id },
      },
      {
        new: true,
      },
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(201).json({ expense });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const createProfit = async (req, res) => {
  const userId = req.user.userId;
  try {
    const profit = new Profit({
      author: userId,
      ...req.body,
    });
    await profit.save();
    const project = await Project.findByIdAndUpdate(
      profit.projectId,
      {
        $push: { 'piggyBanks.profits': profit._id },
      },
      {
        new: true,
      },
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(201).json({ profit });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getExpenses = async (req, res) => {
  const userId = req.user.userId;
  try {
    const expenses = await Expense.find({ author: userId });
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getProfits = async (req, res) => {
  const userId = req.user.userId;
  try {
    const profits = await Profit.find({ author: userId });
    res.status(200).json({ profits });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Invalid ID format' });
  try {
    const expense = await Expense.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateProfit = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Invalid ID format' });
  try {
    const profit = await Profit.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(profit);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Invalid ID format' });
  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteProfit = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Invalid ID format' });
  try {
    await Profit.findByIdAndDelete(id);
    res.status(200).json({ message: 'Profit deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getBalance = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate('piggyBanks.expenses')
      .populate('piggyBanks.profits');
    let totalExpenses = 0;
    let totalProfits = 0;
    if (project.piggyBanks && Array.isArray(project.piggyBanks.expenses)) {
      project.piggyBanks.expenses.forEach((expense) => {
        totalExpenses += expense.amount;
      });
    }
    if (project.piggyBanks && Array.isArray(project.piggyBanks.profits)) {
      project.piggyBanks.profits.forEach((profit) => {
        totalProfits += profit.amount;
      });
    }
    const total = totalProfits - totalExpenses;
    project.piggyBanks.total = total;
    await project.save();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
