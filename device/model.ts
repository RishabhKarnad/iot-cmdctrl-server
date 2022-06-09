import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Device extends BaseEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  isActive!: boolean

  @Column('real')
  batteryLevel!: number

  @Column('real')
  lat!: number

  @Column('real')
  lng!: number
}
