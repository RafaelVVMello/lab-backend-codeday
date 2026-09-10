const express = require("express");
const morgan = require ("morgan")
const app = express();

app.use ('/site', express.static ('src/site'))


app.use(morgan('dev'));

const routerAPI = require ('./routerAPI')
app.use ('/api', routerAPI)

// Exportar o App Express
module.exports = app;