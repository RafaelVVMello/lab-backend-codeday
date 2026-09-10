const db = require("../database/db");

class Usuario {
  static async buscarPorEmail(email) {
    return db("usuarios")
      .where({ email })
      .first();
  }

  static async criar(dados) {
    const [novoUsuario] = await db("usuarios")
      .insert(dados)
      .returning(["id", "nome", "email"]);

    return novoUsuario;
  }
}

module.exports = Usuario;
