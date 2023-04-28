import { RequestHandler } from 'express'

export const getUser: RequestHandler = (req, res) => {
    return res.json('Backoffice route')
}