import express from 'express'
import { createAnnounce, updateAnnounce,deleteAnnounce } from '../controllers/AnnounceAdminController.js'
import { updateCategory,createCategory,getAllCategories } from '../controllers/CategoryController.js';
import { updateArea,createArea,getAllAreas,deleteArea } from '../controllers/AreasControllers.js';

const router = express.Router()
// Rutas de anuncios
router.post('/Announce/create',createAnnounce);
router.put('/Announce/update/:id',updateAnnounce);
router.delete('/Announce/delete/:id',deleteAnnounce);
// Rutas de categorias
router.get('/categories/',getAllCategories);
router.put('/Categories/update/:id',updateCategory);
router.post('/Categories/create',createCategory);
//Rutas de areas
router.get('/Areas',getAllAreas);
router.post('/Areas/create',createArea);
router.put('/Areas/update/:id',updateArea);
router.delete('/Areas/delete/:id',deleteArea);
export default router;