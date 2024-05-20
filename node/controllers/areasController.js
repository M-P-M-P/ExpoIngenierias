import Area from '../models/area.js';

// Obtener todas las áreas
async function getAllAreas(req, res) {
  try {
    const areas = await Area.findAll();
    res.json(areas);
  } catch (error) {
    console.error('Error al obtener las áreas:', error);
    res.status(500).json({ error: 'Error al obtener las áreas.' });
  }
}

export { getAllAreas };
