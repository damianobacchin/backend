import { Router } from 'express'
import { handler } from '../../lib/handler'
import * as controller from '../controllers/user.controller'

const router = Router()


router.get('/', handler(controller.getUser))

export default router