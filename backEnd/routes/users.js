import express from 'express'
import { deleteUserByID, getAllUsers, getUserByID, insertUser, updateUserByID } from '../controllers/users.js'


const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserByID)
router.post('/', insertUser)
router.delete('/:id', deleteUserByID)
router.patch('/:id', updateUserByID)

export default router