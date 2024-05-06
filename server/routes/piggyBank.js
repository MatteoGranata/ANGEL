import express from 'express'
import { createPiggyBank, deletePiggyBank, getBalance, getPiggyBanks, updatePiggyBank } from '../controllers/piggyBanks.js';

const router = express.Router()

router.post('/', createPiggyBank);
router.get('/', getPiggyBanks);
router.get('/balance', getBalance);
router.patch('/:id', updatePiggyBank);
router.delete('/:id', deletePiggyBank);


export default router