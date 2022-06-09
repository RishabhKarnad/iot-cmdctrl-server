import { DataSource } from 'typeorm'

import { ENV } from './env'
import { Device } from './device/model'

export const db = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [Device],
  synchronize: true,
  logging: true,
})
