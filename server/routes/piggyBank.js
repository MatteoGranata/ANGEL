import express from 'express';
import {
  createExpense,
  createProfit,
  deleteExpense,
  deleteProfit,
  getBalance,
  getExpenses,
  getProfits,
  updateExpense,
  updateProfit,
} from '../controllers/piggyBanks.js';

const router = express.Router();

router.post('/expense', createExpense);
router.post('/profit', createProfit);
router.get('/expense', getExpenses);
router.get('/profit', getProfits);
router.get('/:projectId/balance', getBalance);
router.patch('/expense/:id', updateExpense);
router.patch('/profit/:id', updateProfit);
router.delete('/expense/:id', deleteExpense);
router.delete('/profit/:id', deleteProfit);

export default router;
