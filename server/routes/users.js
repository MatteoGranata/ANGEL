import express from 'express'
import { deleteUserByID, getAllUsers, insertUser, updateUserByID, getHomeUser } from '../controllers/users.js'


const router = express.Router()

router.get('/', getAllUsers)
// router.get('/:id', getUserByID)
router.post('/', insertUser)
router.delete('/:id', deleteUserByID)
router.patch('/:id', updateUserByID)
router.get('/home/:username', getHomeUser)

export default router