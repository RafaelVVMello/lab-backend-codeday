require("dotenv").config();

const app = require("./app");
const db = require("./database/db");

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await db.raw("select 1");
    console.log("Conexão com PostgreSQL estabelecida.");

    app.listen(PORT, () => {
      console.log(`Servidor executando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Não foi possível conectar ao PostgreSQL.");
    console.error(erro.message);
    process.exit(1);
  }
}

iniciar();
