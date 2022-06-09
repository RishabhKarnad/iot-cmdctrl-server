import { Router } from 'express'

import { deviceRouter } from '../device/routes'
import { healthCheckRouter } from './health-check'

const router = Router()

router.use('/health-check', healthCheckRouter)
router.use('/devices', deviceRouter)

export { router }
