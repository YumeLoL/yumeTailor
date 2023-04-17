import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public jobId: string;

  @column()
  public userId: string;

  @column()
  public bit: number;

  @column()
  public status: string; // pending, accepted, rejected

  @column()
  public message: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Quotation) {
    model.id = uuid()
  }
}


