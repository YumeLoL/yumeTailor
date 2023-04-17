import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public typeClothId: string

  @column()
  public location: string

  @column()
  public description: string

  @column()
  public budget: string

  @column()
  public status: string //published or unpublished 

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

