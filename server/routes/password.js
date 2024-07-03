import express from 'express';
import { createPassword, deletePassword, getAllPasswords, updatePassword } from '../controllers/passwords.js';

const router = express.Router();

router.post('/', createPassword);
router.get('/', getAllPasswords);
router.patch('/:id', updatePassword);
router.delete('/:id', deletePassword);

export default router;
