import express from 'express'
import { createPost, getPosts } from '../controllers/posts.js'


const router = express.Router()

router.post('/ideas', createPost);
router.get('/ideas', getPosts);
// router.get('/ideas/:id', getPostById);
// router.put('/ideas/:id', updatePost);
// router.delete('/ideas/:id', deletePost);


export default router