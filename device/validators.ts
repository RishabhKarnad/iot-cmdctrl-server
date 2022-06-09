import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST } from 'http-status'
import joi from 'joi'

import { AppError } from '../util'
import { DeviceParams } from './types'

export function validateFindDeviceParams(
  req: Request<{ id: string }, Omit<DeviceParams, 'id'>>,
  res: Response,
  next: NextFunction,
) {
  const { error } = joi.string().uuid().validate(req.params.id)

  if (error) {
    next(new AppError(BAD_REQUEST, 'Invalid device ID'))
  }

  next()
}

export function validateCreateDeviceParams(
  req: Request<{ id: string }, Omit<DeviceParams, 'id'>>,
  res: Response,
  next: NextFunction,
) {
  const { error } = joi.string().uuid().validate(req.params.id)

  if (error) {
    next(new AppError(BAD_REQUEST, 'Invalid device ID'))
  }

  const { error: bodyError } = joi
    .object({
      name: joi.string().required(),
      isActive: joi.boolean(),
      batteryLevel: joi.number().required(),
      lat: joi.number().required(),
      lng: joi.number().required(),
    })
    .validate(req.body)

  if (bodyError) {
    next(new AppError(BAD_REQUEST, bodyError.message))
  }

  next()
}

export function validateUpdateDeviceParams(
  req: Request<{ id: string }, Omit<DeviceParams, 'id'>>,
  res: Response,
  next: NextFunction,
) {
  const { error } = joi.string().uuid().validate(req.params.id)

  if (error) {
    next(new AppError(BAD_REQUEST, 'Invalid device ID'))
  }

  const { error: bodyError } = joi
    .object({
      name: joi.string(),
      isActive: joi.boolean(),
      batteryLevel: joi.number(),
      lat: joi.number(),
      lng: joi.number(),
    })
    .validate(req.body)

  if (bodyError) {
    next(new AppError(BAD_REQUEST, bodyError.message))
  }

  next()
}

export function validateDeleteDeviceParams(
  req: Request<{ id: string }, Omit<DeviceParams, 'id'>>,
  res: Response,
  next: NextFunction,
) {
  const { error } = joi.string().uuid().validate(req.params.id)

  if (error) {
    next(new AppError(BAD_REQUEST, 'Invalid device ID'))
  }

  next()
}
