import express, { Request, Response } from 'express'

import { router } from './routes'
import { createAMQPLink } from './services/amqp'
import { ENV } from './config/env'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

createAMQPLink()

const PORT = ENV.HTTP_SERVER_PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
