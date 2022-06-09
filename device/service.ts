import { DeepPartial } from 'typeorm'

import { CONFIG } from '../config'
import { deviceRepository } from './repository'
import { DeviceParams } from './types'
import * as deviceRegistryService from '../iot-platform/device-registry.service'
import { ENV } from '../env'

export async function getDevices() {
  const devices = await deviceRepository.find()

  return devices
}

export async function getDeviceById(id: string) {
  const device = await deviceRepository.findOneBy({ id })

  return device
}

export async function createDevice(deviceParams: DeviceParams) {
  const device = deviceRepository.create({
    id: deviceParams.id,
    name: deviceParams.name,
    isActive: deviceParams.isActive || CONFIG.DEVICE.DEFAULT_ACTIVE_STATE,
    batteryLevel: deviceParams.batteryLevel,
    lat: deviceParams.lat,
    lng: deviceParams.lng,
  })

  await deviceRegistryService.registerDevice(
    ENV.TENANT_ID,
    deviceParams.id,
    deviceParams.password,
  )

  await deviceRepository.save(device)
}

export async function updateDevice(
  id: string,
  deviceParams: DeepPartial<DeviceParams>,
) {
  await deviceRepository.update({ id }, deviceParams)

  if (deviceParams.password) {
    await deviceRegistryService.updateDevicePassword(
      ENV.TENANT_ID,
      id,
      deviceParams.password,
    )
  }

  const device = await deviceRepository.findOneBy({ id })

  return device
}

export async function deleteDevice(id: string) {
  await deviceRepository.delete({ id })
}
