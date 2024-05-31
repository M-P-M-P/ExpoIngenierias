import express from 'express'
import { getAllAnnouns, getAnnoun } from '../controllers/AnnounController.js'

const router = express.Router()

router.get('/getAnnouns', getAllAnnouns);

router.get('/getAnnoun/:id', getAnnoun);

export default router;