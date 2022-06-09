import { Router } from 'express'
import { CREATED, NOT_FOUND, OK } from 'http-status'

import * as deviceService from './service'
import {
  validateCreateDeviceParams,
  validateDeleteDeviceParams,
  validateFindDeviceParams,
  validateUpdateDeviceParams,
} from './validators'

const deviceRouter = Router()

deviceRouter.get('/', async (req, res) => {
  const devices = await deviceService.getDevices()

  res.status(OK).send({
    devices,
  })
})

deviceRouter.get('/:id', validateFindDeviceParams, async (req, res) => {
  const device = await deviceService.getDeviceById(req.params.id)

  if (!device) {
    res.status(NOT_FOUND).send({
      error: 'Device not found',
    })
  } else {
    res.status(OK).send({
      device,
    })
  }
})

deviceRouter.post('/:id', validateCreateDeviceParams, async (req, res) => {
  await deviceService.createDevice({
    id: req.params.id,
    name: req.body.name,
    isActive: req.body.isActive,
    batteryLevel: req.body.batteryLevel,
    lat: req.body.lat,
    lng: req.body.lng,
  })

  res.status(CREATED).send({
    message: `Device ${req.params.id} created and registered`,
  })
})

deviceRouter.patch('/:id', validateUpdateDeviceParams, async (req, res) => {
  const device = await deviceService.updateDevice(req.params.id, {
    ...req.body,
  })

  if (!device) {
    res.status(NOT_FOUND).send({
      error: 'Device not found',
    })
  } else {
    res.status(OK).send({
      device,
    })
  }
})

deviceRouter.delete('/:id', validateDeleteDeviceParams, async (req, res) => {
  await deviceService.deleteDevice(req.params.id)

  res.status(OK).send({
    message: 'Device removed',
  })
})

export { deviceRouter }
