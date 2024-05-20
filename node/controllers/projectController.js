import Project from '../models/project.js';

// Función para obtener todos los proyectos ordenados de manera ascendente por id
async function fetchAllProjects() {
  try {
    const projects = await Project.findAll({
      order: [
        ['id', 'ASC'] // Orden ascendente por la columna 'id'
      ]
    });
    return projects;
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    throw error;
  }
}

export { fetchAllProjects };
