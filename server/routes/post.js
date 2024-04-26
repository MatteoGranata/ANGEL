import express from 'express'
import { createPost, getPosts, deletePost, updatePost } from '../controllers/posts.js'


const router = express.Router()

router.post('/post', createPost);
router.get('/post', getPosts);
// router.get('/ideas/:id', getPostById);
router.patch('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


export default router