const knex = require("knex");
require("dotenv").config();

// const db = knex({
//   client: "pg",
//   connection: {
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT || 5432),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   },
//   pool: {
//     min: 0,
//     max: 10
//   }
// });

const db = knex({
  client: "sqlite3",
  connection: {
    filename: process.env.DB_FILENAME || "./database.sqlite"
  },
  useNullAsDefault: true
});


module.exports = db;
