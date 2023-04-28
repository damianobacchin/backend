import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import User from '../models/user.model'
import crypto from 'crypto'
import { PassportMethod } from '../config/enums/Passport.enum'
import { IAuthUser } from '../interfaces/user.interface'
import keys from '../config/env/keys'
import { UserRole } from '../config/enums/User.enum'

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy

passport.use(
    PassportMethod.LOGIN,
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email })

                if (!user) return done(null, false, { message: 'Utente non trovato' })

                // Verify password
                const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
                if (user.password !== hashedPassword) return done(null, false, { message: 'Password non corretta' })

                const authUser: IAuthUser = {
                    _id: user._id.toString(),
                    email: user.email,
                    role: user.role
                }

                return done(null, authUser, { message: 'Login effettuato' })

            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.use(
    PassportMethod.USER,
    new JwtStrategy({
        secretOrKey: keys.SECRET,
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
        if (token.role === UserRole.USER)
            return done(null, token)          
        done(null)
    })
)

passport.use(
    PassportMethod.ADMIN,
    new JwtStrategy({
        secretOrKey: keys.SECRET,
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (token, done) => {
        if (token.role === UserRole.ADMIN)
            return done(null, token)
        done(null)
    })
)