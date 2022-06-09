export class AppError extends Error {
  statusCode: number
  isNonRecoverable: boolean

  constructor(
    statusCode: number,
    message: string,
    isNonRecoverable: boolean = false,
    stack?: string,
  ) {
    super(message)
    this.statusCode = statusCode
    this.isNonRecoverable = isNonRecoverable

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
