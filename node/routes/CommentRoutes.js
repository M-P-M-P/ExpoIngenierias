import express from 'express'
import {createCommentJudge, fetchAllComments, fetchCommentByPersonAndProject, fetchCommentsByProject} from '../controllers/CommentController.js'

const router = express.Router()

router.post('/responsable/:id_person/:id_project',createCommentJudge);

// Ruta para obtener todos los comentarios
router.get('/fetchComments', fetchAllComments);

router.get('/project/:id_project', fetchCommentsByProject);

// Ruta para obtener comentarios por id_persona y id_project
router.get('/comentarios/:id_person/:id_project', fetchCommentByPersonAndProject);


export default router;