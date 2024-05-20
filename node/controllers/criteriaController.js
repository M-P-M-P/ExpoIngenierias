import Criteria from '../models/criterias.js';

async function fetchCriteriaById(id) {
  try {
    const criteria = await Criteria.findOne({
      where: {
        id: id,
      },
    });
    console.log('Criteria:', JSON.stringify(criteria, null, 2));
    return criteria;
  } catch (error) {
    console.error('Error al buscar el criterio:', error);
    throw error;
  }
}

export { fetchCriteriaById };
