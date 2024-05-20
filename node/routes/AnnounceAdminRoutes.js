import express from 'express'
import { createAnnounce } from '../controllers/AnnounceAdminController.js'

const router = express.Router()

router.post('/Create',createAnnounce);

export default router;