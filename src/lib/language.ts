import { Request } from 'express'
import { Lang } from '../config/enums/Lang.enum'

export const language = (req: Request) => {
    const lang = req.acceptsLanguages()[0].split('-')[0]
    return lang as Lang
}