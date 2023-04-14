import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import ClothType from 'App/Enums/ClothType'

export default class extends BaseSchema {
  protected tableName = 'cloth_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 50).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([{
        id: ClothType.Shirt,
        name: 'Shirt',
      },{
        id: ClothType.Pants,
        name: 'Pants',
      },{
        id: ClothType.Dress,
        name: 'Dress',
      },{
        id: ClothType.Jacket,
        name: 'Jacket',
      },{
        id: ClothType.Shoes,
        name: 'Shoes',
      }])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
