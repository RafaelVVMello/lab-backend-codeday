// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILENAME || "./database.sqlite"
    },
    useNullAsDefault: true
  },

};
