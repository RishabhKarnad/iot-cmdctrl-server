import axios from 'axios'

import { ENV } from '../env'
import { AppError } from '../util/AppError'

const baseUrl = `${ENV.DEVICE_REGISTRY_HOST}:${ENV.DEVICE_REGISTRY_PORT}`

export async function createTenant(tenantId: string) {
  await axios.post(`${baseUrl}/v1/tenants/${tenantId}`, {})
}

export async function registerDevice(
  tenantId: string,
  deviceId: string,
  password: string,
) {
  const deviceRegResponse = await axios.post(
    `${baseUrl}/v1/devices/${tenantId}/${deviceId}`,
  )

  if (deviceRegResponse.status >= 300) {
    throw new AppError(
      deviceRegResponse.status,
      `Failed to register device ${deviceId} with tenant ${tenantId}`,
    )
  }

  const credentialsResponse = await axios.put(
    `${baseUrl}/v1/credentials/${tenantId}/${deviceId}`,
    {
      body: [
        {
          type: 'hashed-password',
          'auth-id': deviceId,
          secrets: [
            {
              'pwd-plain': password,
            },
          ],
        },
      ],
    },
  )

  if (credentialsResponse.status >= 300) {
    throw new AppError(
      credentialsResponse.status,
      `Failed to update credentials for ${deviceId}`,
    )
  }
}

export async function updateDevicePassword(
  tenantId: string,
  deviceId: string,
  password: string,
) {
  await axios.put(`${baseUrl}/v1/credentials/${tenantId}/${deviceId}`, {
    body: [
      {
        type: 'hashed-password',
        'auth-id': deviceId,
        secrets: [
          {
            'pwd-plain': password,
          },
        ],
      },
    ],
  })
}

export async function deleteDevice(tenantId: string, deviceId: string) {
  await axios.delete(`${baseUrl}/v1/devices/${tenantId}/${deviceId}`, {})
}
