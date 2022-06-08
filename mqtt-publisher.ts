// Test MQTT subscriber for receiving messages

import * as mqtt from 'mqtt'
import { exit } from 'process'
import { promisify } from 'util'

const host = '127.0.0.1'
const tenantId = '72384895-650b-4425-89f2-af78895198e3'
const deviceId = '675bb0ca-7511-4a58-930c-eb64bd8bdf3f'
const password = 'my-password-123'

async function createClient(): Promise<mqtt.MqttClient> {
  const client = mqtt.connect({
    host,
    port: 1883,
    username: `${deviceId}@${tenantId}`,
    password,
  })

  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      resolve(client)
    })

    client.on('error', (error) => {
      reject(error)
    })
  })
}

async function sendTelemetry(client: mqtt.MqttClient) {
  const publish = promisify(client.publish)
  return publish('telemetry', '{ temperature: 25 }')
}

async function main() {
  try {
    console.log(`Connecting to ${host}...`)
    const client = await createClient()
    console.log('Connection estabilshed')
    await sendTelemetry(client)
    console.log('Telemetry published')
  } catch (error) {
    console.log(error)
    exit(1)
  }
}

main()
