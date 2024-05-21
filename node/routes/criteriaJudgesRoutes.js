// routes/criteriaJudges.js
import express from 'express';
import { fetchAllCriteriaJudges, createCriteriaJudge } from '../controllers/criteriaJudgesController.js';

const router = express.Router();

// Ruta para obtener todos los criterios de jueces
router.get('/criteria_judges', fetchAllCriteriaJudges);

// Ruta para crear un nuevo criterio de juez
router.post('/criteria_judges', createCriteriaJudge);

export default router;
