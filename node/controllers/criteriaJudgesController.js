// controllers/criteriaJudgesController.js
import CriteriaJudge from '../models/criteria_judges.js';

// Función para obtener todos los criterios de jueces ordenados de manera ascendente por id_person
async function fetchAllCriteriaJudges(req, res) {
  try {
    const criteriaJudges = await CriteriaJudge.findAll({
      order: [
        ['id_person', 'ASC']
      ]
    });
    res.json(criteriaJudges);
  } catch (error) {
    console.error('Error al obtener los criterios de jueces:', error);
    res.status(500).json({ error: error.message });
  }
}

// Función para crear un nuevo criterio de juez
async function createCriteriaJudge(req, res) {
  try {
    const criteriaJudge = await CriteriaJudge.create(req.body);
    res.status(201).json(criteriaJudge);
  } catch (error) {
    console.error('Error al crear el criterio de juez:', error);
    res.status(500).json({ error: error.message });
  }
}

export { fetchAllCriteriaJudges, createCriteriaJudge };
