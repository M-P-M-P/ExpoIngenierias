import express from 'express';
import { fetchAllCriterias } from '../controllers/CriteriaController.js';

const router = express.Router();

router.get('/fetchCriterias', fetchAllCriterias);

export default router;
