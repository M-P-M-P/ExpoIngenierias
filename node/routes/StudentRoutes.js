import express from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudent, updateStudent } from '../controllers/StudentController.js'

const router = express.Router();


router.get('/getStudents', getAllStudents);
router.get('/getStudent/:id', getStudent);
router.post('/createStudent/', createStudent);
router.put('/updateStudent/:id', updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);



export default router;
