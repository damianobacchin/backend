import { Router } from 'express'
import * as controller from '../controllers/post.controller'
import { handler } from '../../lib/handler'
import passport from 'passport'
import { PassportMethod } from '../../config/enums/Passport.enum'
const router = Router()


router.post('/create', passport.authenticate(PassportMethod.USER, { session: false }), handler(controller.createPost))
router.get('/all', handler(controller.getAllPosts))

export default router