require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("./database/db");
const Usuario = require("./models/Usuario");

async function criarUsuario() {
  try {
    const email = "professor@teste.com";

    const existente = await Usuario.buscarPorEmail(email);

    if (existente) {
      console.log("O usuário de teste já existe.");
      return;
    }

    const senhaHash = await bcrypt.hash("123456", 10);

    const usuario = await Usuario.criar({
      nome: "Professor",
      email,
      senha: senhaHash
    });

    console.log("Usuário de teste criado:");
    console.log(usuario);
    console.log("");
    console.log("Credenciais:");
    console.log("email: professor@teste.com");
    console.log("senha: 123456");
  } catch (erro) {
    console.error("Erro ao criar usuário:");
    console.error(erro);
  } finally {
    await db.destroy();
  }
}

criarUsuario();