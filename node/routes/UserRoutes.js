// routes/userRoutes.js
import express from 'express';
import { getUsers, updateUser, updatePersonId, deletePerson, updateStudentId, getUserById} from '../controllers/UserController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
// router.post('/:id', updateStudentId);
// router.delete('/:id', deletePerson);

export default router;
