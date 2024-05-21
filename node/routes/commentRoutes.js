// routes/commentRoutes.js
import express from 'express';
import { createComment, fetchAllComments , fetchCommentByPersonAndProject} from '../controllers/commentController.js';

const router = express.Router();

// Ruta para crear un nuevo comentario
router.post('/comments', createComment);

// Ruta para obtener todos los comentarios
router.get('/comments', fetchAllComments);

router.get('/comments/:id_person/:id_project', fetchCommentByPersonAndProject);


export default router;
