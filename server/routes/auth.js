import express from 'express'
import { login, verify } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddlware.js'
import { register } from '../controllers/registerController.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/verify', authMiddleware, verify)

export default router;