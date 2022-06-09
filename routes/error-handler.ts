import { NextFunction, Request, Response } from 'express'
import { AppError } from '../util'

export function handleError(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error.message)

  if (error.isNonRecoverable) {
    process.exit(1)
  }

  res.status(error.statusCode).send({
    error: error.message,
  })
}
