import { IEnvironment } from '../../interfaces/env.interface'

import dotenv from 'dotenv'
dotenv.config()

const development: IEnvironment = {
    NODE_ENV: 'development',
    ATLAS_URI: process.env.ATLAS_URI,
    SECRET: process.env.SECRET
}

export default development