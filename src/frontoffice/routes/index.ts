import { Application } from 'express'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import postRoutes from './post.routes'

export const loadFrontofficeRoutes = (app: Application) => {
    app.use('/auth', authRoutes)
    app.use('/user', userRoutes)
    app.use('/post', postRoutes)
}