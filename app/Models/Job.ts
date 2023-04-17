import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public clothType: number

  @column()
  public location: string

  @column()
  public description: string

  @column()
  public budget: number

  @column()
  public status: boolean // open - true, closed - false

  @column()
  public quotationCount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Job) {
    model.id = `JOB_${uuid()}`
  }
}

