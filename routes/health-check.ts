import { Router } from 'express'

import { createOKPayload } from '../util'
import { ROUTE_NAMES } from './route-names'

const healthCheckRouter = Router()

healthCheckRouter.get(ROUTE_NAMES.HEALTH_CHECK, (req, res) => {
  res.send(createOKPayload())
})

export { healthCheckRouter }
