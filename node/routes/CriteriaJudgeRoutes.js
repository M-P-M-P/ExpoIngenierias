import express from 'express';
import { fetchAllCriteriaJudges, createCriteriaJudge, fetchCriteriaGrade } from '../controllers/CriteriaJudgeController.js';

const router = express.Router();

router.get('/fetchCriteriaJudge', fetchAllCriteriaJudges);
router.post('/createCriteriaJudge', createCriteriaJudge);
router.get('/fetchGrade/:id_criteria/:id_person/:id_project', fetchCriteriaGrade);

export default router;
