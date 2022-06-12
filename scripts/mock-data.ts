import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'
import { argv } from 'yargs'

import { Device } from '../device/model'
import { DeviceParams } from '../device/types'
import * as deviceService from '../device/service'
import { db } from '../db'

function createDeviceParams(): DeviceParams {
  return {
    id: uuid(),
    name: `Device ${faker.random.numeric(4)}`,
    isActive: true,
    batteryLevel: faker.datatype.number({
      min: 25,
      max: 100,
      precision: 2,
    }),
    lat: faker.datatype.number({
      min: 0,
      max: 66.5,
      precision: 3,
    }),
    lng: faker.datatype.number({
      min: 0,
      max: 360,
      precision: 3,
    }),
    password: faker.random.alphaNumeric(8),
  }
}

async function addDevices(count: number) {
  await Promise.all(
    Array(count)
      .fill(0)
      .map(() => {
        deviceService.createDevice(createDeviceParams())
      }),
  )
}

async function populate() {
  await addDevices(10)
}

async function clear() {
  await db.getRepository(Device).clear()
}

async function main() {
  await db.initialize()

  // @ts-ignore
  if (argv['populate']) {
    await populate()
    // @ts-ignore
  } else if (argv['clear']) {
    await clear()
  } else {
    console.error('No arguments provided. Exiting.')
  }
}

main()
