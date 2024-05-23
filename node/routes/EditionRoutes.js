import express from 'express'
import { getAllEditions } from '../controllers/EditionController.js';

const router = express.Router()

router.get('/',getAllEditions);

export default router;