const express = require("express");
const produtoRoutes = require("./routes/produtoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/*const mid = function (req, res) {
  const method = req.method;
  const path = req.path;
  const query = req.query;

  return res.send(`
    Hello World! A requisição tem a seguinte estrutura:<br>
    Metodo: ${method}<br>
    Caminho: ${path}<br>
    Consulta: ${JSON.stringify(query)}<br>
  `);
};

const midHello = function (req, res) {
  res.send("Hello World");
};
*/
app.get("/", (req, res) =>{
  const method = req.method;
  const path = req.path;
  const query = req.query;

  return res.send(`
    Hello World! A requisição tem a seguinte estrutura:<br>
    Metodo: ${method}<br>
    Caminho: ${path}<br>
    Consulta: ${JSON.stringify(query)}<br>
  `)
});
app.get("/hello", (req, res) => {
  res.send("Hello World")
});

module.exports = app;