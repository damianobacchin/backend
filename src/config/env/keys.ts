import logger from '../../services/logger';
import { IEnvironment } from '../../interfaces/env.interface'

import production from './prod'
import staging from './staging'
import dev from './dev'



let keys: IEnvironment

switch (process.env.NODE_ENV) {

    case 'production': // PRODUCTION
        logger.info('Running on PRODUCTION mode')
        keys = production
        break

    case 'staging': // STAGING
        logger.info('Running on STAGING mode')
        keys = staging
        break

    default: // DEVELOPMENT
        logger.info('Running on DEVELOPMENT mode')
        keys = dev
        break
}

export default keys