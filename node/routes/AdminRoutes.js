import express from 'express'
import { createAnnounce, updateAnnounce,deleteAnnounce } from '../controllers/AnnounceAdminController.js'
import { updateCategory,createCategory,getAllCategories,getCategoryById,inhabilitateCategory } from '../controllers/CategoryController.js';
import { updateArea,createArea,getAllAreas,deleteArea,getAresById,inhabilitateArea } from '../controllers/AreasControllers.js';

import { getAreaJudge } from '../controllers/personController.js';

const router = express.Router()
// Rutas de anuncios
router.post('/Announce/create',createAnnounce);
router.put('/Announce/update/:id',updateAnnounce);
router.delete('/Announce/delete/:id',deleteAnnounce);
// Rutas de categorias
router.get('/categories/',getAllCategories);
router.get('/Categories/:id',getCategoryById);
router.put('/Categories/update/:id',updateCategory);
router.post('/Categories/create',createCategory);
router.patch('/Categories/inhabilitate/:id',inhabilitateCategory);

//Rutas de areas
router.get('/Areas',getAllAreas);
router.get('/Areas/:id', getAresById);
router.post('/Areas/create',createArea);
router.put('/Areas/update/:id',updateArea);
router.patch('/Areas/inhabilitate/:id',inhabilitateArea);

//Judges Routes
router.get('/getJudges/:areaId', getAreaJudge); // Add this line for the new route

export default router;