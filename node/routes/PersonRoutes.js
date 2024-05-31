import express from 'express';
import {getAllPersons, getPerson, createPerson,updatePerson} from '../controllers/PersonController.js'


const router = express.Router();

//Obtener todos los proyectos
router.get('/getPersons', getAllPersons);
//Obtener un solo proyecto por su id
router.get('/getPerson/resume/:id', getPerson);

router.put('/updatePerson/:id', updatePerson);
router.delete('/createPerson/:id', createPerson);


export default router;
