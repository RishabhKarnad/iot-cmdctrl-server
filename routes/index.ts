import { Router } from 'express'

import { healthCheckRouter } from './health-check'

const router = Router()

router.use(healthCheckRouter)

export { router }
