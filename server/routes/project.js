import express from 'express'
import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/projects.js';

const router = express.Router()

router.post('/',createProject );
router.get('/',getAllProjects );
// router.get('/',);
router.patch('/:id',updateProject );
router.delete('/:id',deleteProject );


export default router