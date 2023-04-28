import { Application } from 'express'

import userRoutes from './user.routes'

export const loadBackofficeRoutes = (app: Application) => {
    app.use('/admin/user', userRoutes)
}