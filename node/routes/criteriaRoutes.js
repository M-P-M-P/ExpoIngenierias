import express from 'express';
import Criteria from '../models/criterias.js';

const router = express.Router();

// Ruta para obtener todos los criterios
router.get('/criterias', async (req, res) => {
  try {
    const criterias = await Criteria.findAll();
    res.json(criterias);
  } catch (error) {
    console.error('Error al obtener los criterios:', error);
    res.status(500).json({ error: 'Error al obtener los criterios.' });
  }
});

export default router;
