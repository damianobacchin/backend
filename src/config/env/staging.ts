import { IEnvironment } from '../../interfaces/env.interface'

const staging: IEnvironment = {
    ATLAS_URI: process.env.ATLAS_URI,
    SECRET: process.env.SECRET
}

export default staging