import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuid } from 'uuid'
import { column, beforeSave, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public roleId: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid(model: User) {
    if(model.roleId === 1){
      model.id = `ADMIN_${uuid()}`
    } else if(model.roleId === 2){
      model.id = `CONSUMER_${uuid()}`
    } else if(model.roleId === 3){
      model.id = `MAKER_${uuid()}`
    }
  }
}
