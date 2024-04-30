import express from "express";
import { createTimer, getTimer, resetTimer, startTimer, stopTimer } from "../controllers/timers.js";
const router = express.Router()

router.post('/', createTimer);
router.get('/', getTimer);
router.put('/:id/avvia',startTimer);
router.put('/:id/arresta', stopTimer)
router.put('/:id/reset', resetTimer);
// router.delete('/:id', delete)


export default router;
