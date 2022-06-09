import { create_container } from 'rhea'

import { ENV } from './env'

export function createAMQPLink() {
  const host = ENV.AMQP_NETWORK_HOST
  const tenantId = ENV.TENANT_ID
  console.log('Host:', host)
  console.log('Tenant:', tenantId)

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
}
