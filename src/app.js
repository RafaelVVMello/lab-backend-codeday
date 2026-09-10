const express = require("express");
// const produtoRoutes = require("./routes/produtoRoutes");
// const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware de boas vindas
const mid = function (req, res) {
  res.send ('Olá mundo!!!')
}

app.use (mid);


// app.use(express.json());

// app.get("/", (req, res) => {
//   return res.json({
//     mensagem: "API Node + Express + Knex + PostgreSQL",
//     endpoints: {
//       auth: [
//         "POST /auth/login",
//         "GET /auth/validar"
//       ],
//       produtos: [
//         "GET /produtos",
//         "GET /produtos/:id",
//         "POST /produtos",
//         "PUT /produtos/:id",
//         "DELETE /produtos/:id"
//       ]
//     }
//   });
// });

// app.use("/auth", authRoutes);
// app.use("/produtos", produtoRoutes);

// app.use((req, res) => {
//   return res.status(404).json({
//     erro: "Rota não encontrada"
//   });
// });

module.exports = app;
