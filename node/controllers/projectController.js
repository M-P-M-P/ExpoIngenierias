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
// Función para obtener un proyecto por su ID
async function fetchProjectById(projectId) {
  try {
    const project = await Project.findByPk(projectId); // Utilizamos findByPk para buscar por primary key
    if (!project) {
      throw new Error(`Proyecto con id ${projectId} no encontrado`);
    }
    return project;
  } catch (error) {
    console.error(`Error al obtener el proyecto con id ${projectId}:`, error);
    throw error;
  }
}

export { fetchAllProjects, fetchProjectById};
