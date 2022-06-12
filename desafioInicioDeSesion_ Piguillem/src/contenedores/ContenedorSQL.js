import knex from "knex";

export default class ContenedorSQL {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async createTable(table) {
    return await this.knex.schema.dropTableIfExists(table).finally(() => {
      return this.knex.schema.createTable(table, (table) => {
        table.increments("id").primary();
        table.string("name", 50).notNullable();
        table.string("code", 10).notNullable();
        table.float("price");
        table.integer("stock");
      });
    });
  }

  async insert(producto) {
    return await this.knex("products").insert(producto);
  }

  async getAll() {
    return await this.knex("products").select("*");
  }

  async deleteProductById(id) {
    return await this.knex.from("products").where("id", id).del();
  }

  async updateStockById(stock, id) {
    return await this.knex
      .from("products")
      .where("id", id)
      .update({ stock: stock });
  }

  async close() {
    await this.knex.destroy();
  }
}
