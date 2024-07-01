import express from 'express';

import {
  deleteUserByID,
  getAllUsers,
  getUserByID,
  insertImageUser,
  insertUser,
  updateUserByID,
} from '../controllers/users.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/', insertUser);
router.delete('/:id', deleteUserByID);
router.patch('/:id', updateUserByID);
router.post('/:id/image', upload.single('image'), insertImageUser);

export default router;
