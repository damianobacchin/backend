import { Router } from 'express'
import { handler } from '../../lib/handler'
import * as controller from '../controllers/auth.controller'

const router = Router()


router.post('/register', handler(controller.register))
router.post('/login', handler(controller.login))
router.get('/reset-password', handler(controller.resetPassword))
router.patch('/change-password', handler(controller.login))

export default router