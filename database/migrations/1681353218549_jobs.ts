import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "jobs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary();
      table.string("user_id").notNullable();
      table.integer("cloth_type");
      table.string("location").notNullable();
      table.string("description").notNullable();
      table.decimal("budget").notNullable();
      table.boolean("status").notNullable().defaultTo(true);
      table.integer("quotation_count").notNullable().defaultTo(0);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
} 