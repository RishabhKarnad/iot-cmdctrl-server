import express, { Request, Response } from 'express'
import { create_container, connect } from 'rhea'

// const host = '127.0.0.1'
const host = 'host.docker.internal'

const tenantId = '72384895-650b-4425-89f2-af78895198e3'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/health-check', (req, res) => res.send({ message: 'OK' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

const container = create_container({
  id: `container-${tenantId}`,
})

const connection = container.connect({
  id: `connection-${tenantId}`,
  host,
  port: 15672,
  username: 'consumer@HONO',
  password: 'verysecret',
  servername: 'hono-dispatch-router',
  reconnect_limit: 5,
})

connection.on('connection_open', () => {
  console.log('Connected!')
  const rec = connection.open_receiver({
    name: 'telemetry',
    source: { address: `telemetry/${tenantId}` },
  })

  rec.on('receiver_open', () => {
    console.log('Receiver open')
  })

  rec.on('message', (ctx) => {
    console.log('Message received:')
    console.log('|__ Tenant:', ctx.message?.message_annotations?.tenant_id)
    console.log('|__ Device:', ctx.message?.message_annotations?.device_id)
    console.log('|__ Message:', ctx.message?.body?.content?.toString())
  })
})

connection.on('connection_close', () => {
  console.log('Connection closed')
})

connection.on('connection_error', () => {
  console.log('Connection error')
})

container.on('disconnected', (ctx) => {
  console.log('Disconnected:', ctx.error)
})
