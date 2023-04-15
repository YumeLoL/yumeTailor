import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public originalName: string;

  @column()
  public path: string;

  @column()
  public size: number;

  @column()
  public jobId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Image) {
    model.id = uuid()
  }
}

