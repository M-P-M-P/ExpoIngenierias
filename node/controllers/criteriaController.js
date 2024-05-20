import Criteria from '../models/criterias.js';

async function fetchAllCriterias() {
  try {
    const criterias = await Criteria.findAll();
    console.log('Criterias:', JSON.stringify(criterias, null, 1));
    return criterias;
  } catch (error) {
    console.error('Error al buscar los criterios:', error);
    throw error;
  }
}

export { fetchAllCriterias };
