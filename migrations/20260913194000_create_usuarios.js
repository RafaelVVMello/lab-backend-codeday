exports.up = async function (knex) {
  await knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("nome", 100).notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("senha", 255).notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("usuarios");
};
