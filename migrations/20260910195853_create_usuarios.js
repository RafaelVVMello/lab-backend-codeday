/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('produtos', (table) => {
    // id SERIAL PRIMARY KEY (no SQLite vira INTEGER PRIMARY KEY AUTOINCREMENT)
    table.increments('id').primary();

    // descricao VARCHAR(150) NOT NULL
    table.string('descricao', 150).notNullable();

    // preco NUMERIC(10,2) NOT NULL
    table.decimal('preco', 10, 2).notNullable();

    // categoria VARCHAR(100) (aceita nulo por padrão)
    table.string('categoria', 100).nullable();

    // estoque INTEGER NOT NULL DEFAULT 0
    table.integer('estoque').notNullable().defaultTo(0);

    // CHECK constraints (preco >= 0 AND estoque >= 0)
    table.check('?? >= 0', ['preco'], 'chk_produtos_preco_positivo');
    table.check('?? >= 0', ['estoque'], 'chk_produtos_estoque_positivo');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('produtos');
};
