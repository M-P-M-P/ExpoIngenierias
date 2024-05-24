import express from 'express';
import { getAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

// Ruta para obtener todas las categorías
router.get('/categories', getAllCategories);

export default router;
