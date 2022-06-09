import 'reflect-metadata'
import express from 'express'

import { router } from './routes'
import { db } from './db'
// import { createAMQPLink } from './amqp'
import { ENV } from './env'
import { handleError } from './routes/error-handler'

async function init() {
  await db.initialize()

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(router)

  app.use(handleError)

  // createAMQPLink()

  const PORT = ENV.HTTP_SERVER_PORT
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
  })
}

init()
