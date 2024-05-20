import Category from '../models/category.js';

// Obtener todas las categorías
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías.' });
  }
}

export { getAllCategories };
