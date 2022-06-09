import { db } from '../db'
import { Device } from './model'

export const deviceRepository = db.getRepository(Device)
