import express from 'express'
import { createPost, getPosts, deletePost } from '../controllers/posts.js'


const router = express.Router()

router.post('/post', createPost);
router.get('/post', getPosts);
// router.get('/ideas/:id', getPostById);
// router.put('/ideas/:id', updatePost);
router.delete('/post/:id', deletePost);


export default router