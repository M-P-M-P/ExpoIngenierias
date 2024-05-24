import Student from '../models/student.js';

async function fetchAllStudents(req, res) {
  try {
    const students = await Student.findAll({
      order: [['id', 'ASC']]  // Ordenar por ID ascendente
    });
    res.json(students);
  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener los estudiantes.' });
  }
}
async function findStudentById(req, res) {
    const studentId = req.params.id;
  
    try {
      const student = await Student.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Estudiante no encontrado.' });
      }
      res.json(student);
    } catch (error) {
      console.error('Error al obtener el estudiante por ID:', error);
      res.status(500).json({ error: 'Error al obtener el estudiante.' });
    }
  }

export { fetchAllStudents, findStudentById };
