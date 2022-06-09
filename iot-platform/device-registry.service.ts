import fetch from 'node-fetch'

import { ENV } from '../env'

const baseUrl = `${ENV.DEVICE_REGISTRY_HOST}:${ENV.DEVICE_REGISTRY_PORT}`

export async function createTenant(tenantId: string) {
  await fetch(`${baseUrl}/v1/tenants/${tenantId}`, {
    method: 'POST',
  })
}

export async function registerDevice(
  tenantId: string,
  deviceId: string,
  password: string,
) {
  await fetch(`${baseUrl}/v1/devices/${tenantId}/${deviceId}`, {
    method: 'POST',
  })

  await fetch(`${baseUrl}/v1/credentials/${tenantId}/${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify([
      {
        type: 'hashed-password',
        'auth-id': deviceId,
        secrets: [
          {
            'pwd-plain': password,
          },
        ],
      },
    ]),
  })
}

export async function updateDevicePassword(
  tenantId: string,
  deviceId: string,
  password: string,
) {
  await fetch(`${baseUrl}/v1/credentials/${tenantId}/${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify([
      {
        type: 'hashed-password',
        'auth-id': deviceId,
        secrets: [
          {
            'pwd-plain': password,
          },
        ],
      },
    ]),
  })
}

export async function deleteDevice(tenantId: string, deviceId: string) {
  await fetch(`${baseUrl}/v1/devices/${tenantId}/${deviceId}`, {
    method: 'DELETE',
  })
}
