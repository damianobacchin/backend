import cron from 'node-cron'
import logger from './logger'
import { runTask } from '../tasks'

const each1min = '* * * * *'
const each5min = '*/5 * * * *'

function scheduleTasks() {
    logger.info('Scheduled tasks loaded')

    // cron.schedule(each1min, async() => runTask())
}

scheduleTasks()