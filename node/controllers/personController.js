import Person from '../models/persons.js';

async function fetchAllPersons(req, res) {
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

async function fetchPersonById(req, res) {
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

export { fetchAllPersons, fetchPersonById };
