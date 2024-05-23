import express from 'express'
import { deleteProject, getAllProjects, getProject, handleRegister, handleEdition, handleResumen, getProjectsByResponsable} from '../controllers/ProjectController.js'

const router = express.Router()



//Obtener todos los proyectos
router.get('/', getAllProjects);
//Obtener un solo proyecto por su id
router.get('/resume/:id', getProject);

//router.put('/:id', updateProject);
router.delete('/delete/:id', deleteProject);

router.all('/editionProject/:id', handleEdition)

router.all('/resumeProject/:id', handleResumen)

//Registro del proyecto
router.all('/register', handleRegister)
router.get('/responsable/:id_responsable', getProjectsByResponsable);



export default router;