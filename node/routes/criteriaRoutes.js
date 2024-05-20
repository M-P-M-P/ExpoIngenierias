import express from 'express';
import { fetchCriteriaById } from '../controllers/criteriaController.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const criteriaId = req.params.id;
    const criteria = await fetchCriteriaById(criteriaId);
    res.json(criteria);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el criterio.' });
  }
});

export default router;
