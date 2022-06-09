import { Router } from 'express'

import * as deviceService from './service'

const deviceRouter = Router()

deviceRouter.get('/', async (req, res) => {
  const devices = await deviceService.getDevices()

  res.send({
    devices,
  })
})

export { deviceRouter }
