import express from 'express'
import { createAnnounce, updateAnnounce,deleteAnnounce } from '../controllers/AnnounceAdminController.js'
import { updateCategory } from '../controllers/CategoryController.js';
import { updateArea,createArea,getAllAreas,deleteArea } from '../controllers/AreasControllers.js';

import { getAreaJudge, getAllJudges } from '../controllers/personController.js';
import { getProjectJudges } from '../controllers/ProjectController.js';

const router = express.Router()
// Rutas de anuncios
router.post('/Announce/create',createAnnounce);
router.put('/Announce/update/:id',updateAnnounce);
router.delete('/Announce/delete/:id',deleteAnnounce);
// Rutas de categorias
router.put('/Categories/update/:id',updateCategory);
//Rutas de areas
router.get('/Areas',getAllAreas);
router.post('/Areas/create',createArea);
router.put('/Areas/update/:id',updateArea);
router.delete('/Areas/delete/:id',deleteArea);

//Judges Routes
router.get('/getJudges/:areaId', getAreaJudge); // query string (?projectId=<project.id>)
router.get('/getAllJudges', getAllJudges); // query string (?projectId=<project.id>)

// Projects Routes
router.get('/getProjectJudges', getProjectJudges); // query string (?projectId=<project.id>)


export default router;