import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import QuoteStatus from 'App/Enums/QuoteStatus'

export default class extends BaseSchema {
  protected tableName = 'quotations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('job_id').notNullable()
      table.string('user_id').notNullable()
      table.decimal('bit').notNullable()
      table.integer('status').notNullable().defaultTo(QuoteStatus.PENDING)
      table.string('message').notNullable( )

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
