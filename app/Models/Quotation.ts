import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public jobId: string;

  @column()
  public userId: string; // maker

  @column()
  public bid: number;

  @column()
  public status: number; // PENDING 2001, ACCEPTED 2002, REJECTED 2003

  @column()
  public message: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Quotation) {
    model.id = `QUOTE_${uuid()}`
  }
}


