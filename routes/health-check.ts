import { Router } from 'express'

import { createOKPayload } from '../util'

const healthCheckRouter = Router()

healthCheckRouter.get('/', (req, res) => {
  res.send(createOKPayload())
})

export { healthCheckRouter }
