const express = require("express");
const app = express();

// Middleware de boas vindas
const mid = function (req, res) {
  const method = req.method
  const path = req.path
  const query = req.query

  res.send (`Olá Mundo!!! <br> 
    A requisição tem a seguinte estrutura: <br>
       Método: ${method} <br>
       URL Path: ${path} <br>
       URL QueryString: ${JSON.stringify (query)}`)
}

const midHello = function (req, res) {
    res.send ('Olá mundo!!!')
}

// Inserindo um Middleware no Mid. Manager
app.get ('/', mid)
app.get ('/hello', midHello)

// Exportar o App Express
module.exports = app;