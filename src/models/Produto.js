const db = require("../database/db");

class Produto {
  static async listarTodos() {
    return db("produtos")
      .select("*")
      .orderBy("id");
  }

  static async buscarPorId(id) {
    return db("produtos")
      .where({ id })
      .first();
  }

  static async criar(dados) {
    const [novoProduto] = await db("produtos")
      .insert(dados)
      .returning("*");

    return novoProduto;
  }

  static async atualizar(id, dados) {
    const [produtoAtualizado] = await db("produtos")
      .where({ id })
      .update(dados)
      .returning("*");

    return produtoAtualizado;
  }

  static async excluir(id) {
    return db("produtos")
      .where({ id })
      .del();
  }
}

module.exports = Produto;
