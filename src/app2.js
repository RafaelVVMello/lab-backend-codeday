const express = require("express");
const produtoRoutes = require("./routes/produtoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    console.log(new Date().toISOString(), req.method, req.path, JSON.stringify(req.query));
    next();
});

app.get("/", (req, res) =>{
  const method = req.method;
  const path = req.path;
  const query = req.query;

  return res.json({
    mensagem: "API Node + Express + Knex + PostgreSQL",
    metodo: method,
    caminho: path,
    consulta: query
  });
});

app.use("/auth", authRoutes);

app.use("/produtos", produtoRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

module.exports = app;