/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("foodsales", (table) => {
    table.increments("id").primary();
    table.string("item_category").notNullable();
    table.string("date_scraped").notNullable();
    table.string("item_brand").notNullable();
    table.string("item_name").notNullable();
    //maybe change to int
    table.string("item_sale_price").notNullable();
    //maybe change to int
    table.string("item_original_price").notNullable();
    table.string("item_sale_expiry_date").notNullable();
    table.string("item_image").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("foodsales");
};
