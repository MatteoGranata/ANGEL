import express from 'express';
import {
  createTimer,
  deleteTimer,
  getTimer,
  resetTimer,
  startTimer,
  stopTimer,
  updateTimer,
} from '../controllers/timers.js';
const router = express.Router();

router.post('/', createTimer);
router.get('/', getTimer);
router.patch('/:id', updateTimer);
router.patch('/:id/avvia', startTimer);
router.patch('/:id/arresta', stopTimer);
router.put('/:id/reset', resetTimer);
router.delete('/:id', deleteTimer);

export default router;
