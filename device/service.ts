import { deviceRepository } from './repository'

export async function getDevices() {
  const devices = await deviceRepository.find()

  return devices
}
