import { Router } from 'express'
import * as controller from '../controllers/post.controller'
import { handler } from '../../lib/handler'
import { authenticate } from 'passport'
import { PassportMethod } from '../../config/enums/Passport.enum'
const router = Router()


router.post('/create', authenticate(PassportMethod.USER, { session: false }), handler(controller.createPost))
router.get('/all', handler(controller.getAllPosts))

export default router