import { RequestHandler } from 'express'
import crypto from 'crypto'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { IAuthUser, IUser } from '../../interfaces/user.interface'
import User from '../../models/user.model'
import { PassportMethod } from '../../config/enums/Passport.enum'
import keys from '../../config/env/keys'

export const register: RequestHandler = async (req, res) => {
    const { email, password, name } = req.body

    // Params validation
    if (!email || !password || !name) return res.status(422).json('Parametri mancanti')

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

    // Create user
    const newUser = new User({
        email,
        password: hashedPassword,
        name
    })

    // Save user
    await newUser.save()

    return res.status(201).json('Utente registrato')
}

export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(422).json('Parametri mancanti')

    passport.authenticate(
        PassportMethod.LOGIN,
        async (err: Error, user: IAuthUser, info: { message: string }) => {
            if (err) return res.status(500).json('Errore di autenticazione')
            req.login(user, { session: false }, async (error) => {
                if (error || !user) return res.status(500).json('Errore di autenticazione')
                const tokenBody = { _id: user._id, email: user.email, role: user.role }
                const signedToken = jwt.sign(tokenBody, keys.SECRET!)

                return res.json({ token: signedToken, user })
            })
        })(req, res, next)
}

export const resetPassword: RequestHandler = async (req, res) => {
    const { email } = req.query

    if (!email) return res.status(422).json('Parametri mancanti')

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json('Utente non trovato')

    const tokenBody = { _id: user._id, email: user.email, role: user.role }
    const signedToken = jwt.sign(tokenBody, keys.SECRET!)

    // TODO: send email

    return res.json('Email di recupero password inviata')
}