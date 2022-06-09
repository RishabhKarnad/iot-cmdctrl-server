import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Device extends BaseEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  isActive!: boolean

  @Column()
  batteryLevel!: number

  @Column()
  lat!: number

  @Column()
  lng!: number
}
