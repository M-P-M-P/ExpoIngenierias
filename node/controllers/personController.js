import Person from '../models/PersonModel.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllPersons = async (req, res) => {
  try {
      const persons = await Person.findAll()
      res.json(persons)
  } catch (error) {
      res.json( {message: error.message} )
  }
}

//Mostrar un proyecto
export const getStudent = async (req, res) => {
      try {
          const person = await Person.findAll({
              where:{ id:req.params.id }
          })
          res.json(person[0])
      } catch (error) {
          res.json( {message: error.message} )
      }
}

//Crear un registro
export const createPerson = async (req, res) => {
  try {
      const person = await Person.create(req.body);
      console.log("Nuevo proyecto creado:", person.toJSON());
      res.status(201).json({ message: "¡Registro creado correctamente!", person });
  } catch (error) {
      console.error("Error al crear el proyecto:", error);
      res.status(500).json({ message: error.message });
  }
};


//Actualizar un proyecto
export const updatePerson = async (req, res) => {
  try {
      await Person.update(req.body, {
          where: { id: req.params.id}
      })
      res.json({
          "message":"¡Registro actualizado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

//Eliminar un registro
export const deletePerson = async (req, res) => {
  try {
      await Person.destroy({ 
          where: { id : req.params.id }
      })
      res.json({
          "message":"¡Registro eliminado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

export const fetchAllPersons = async (req, res) => {
  try {
    const persons = await Person.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(persons);
  } catch (error) {
    console.error('Error fetching all persons:', error);
    res.status(500).json({ error: 'Error fetching all persons.' });
  }
}

export const fetchPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findByPk(id);
    if (!person) {
      res.status(404).json({ error: 'Person not found.' });
    } else {
      res.json(person);
    }
  } catch (error) {
    console.error('Error fetching person by id:', error);
    res.status(500).json({ error: 'Error fetching person by id.' });
  }
}
