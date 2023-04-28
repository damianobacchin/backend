import { RequestHandler } from 'express'
import { IAuthUser } from '../../interfaces/user.interface'
import User from '../../models/user.model'
import { response } from '../../lib/response'
import { ResponseMessage } from '../../config/enums/Response.enum'
import { language } from '../../lib/language'



export const profile: RequestHandler = async (req, res) => {
    const userId = (req.user as IAuthUser)._id
    const lang = language(req)

    // Find User
    const user = await User.findById(userId)
    if (!user) return res.status(404).json(response(ResponseMessage.DOCUMENT_NOT_FOUND, lang))

    return res.json(user)
}