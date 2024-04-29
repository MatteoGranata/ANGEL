import express from 'express'
import { createPost, getPosts, deletePost, updatePost } from '../controllers/posts.js'


const router = express.Router()

router.post('/', createPost);
router.get('/', getPosts);
// router.get('/:id', getPostById);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);


export default router