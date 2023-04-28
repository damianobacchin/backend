import { RequestHandler, Router } from 'express'
import passport from 'passport'
import { handler } from '../../lib/handler'
import * as controller from '../controllers/user.controller'
import { PassportMethod } from '../../config/enums/Passport.enum'
const router = Router()


router.get('/profile', passport.authenticate(PassportMethod.USER, { session: false }), handler(controller.profile))

export default router