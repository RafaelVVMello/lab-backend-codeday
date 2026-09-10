const Produto = require("../models/Produto");

class ProdutoController {
  static async listar(req, res) {
    try {
      const produtos = await Produto.listarTodos();
      return res.json(produtos);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        erro: "Erro ao consultar produtos"
      });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          erro: "ID inválido"
        });
      }

      const produto = await Produto.buscarPorId(id);

      if (!produto) {
        return res.status(404).json({
          erro: "Produto não encontrado"
        });
      }

      return res.json(produto);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        erro: "Erro ao consultar produto"
      });
    }
  }

  static async criar(req, res) {
    try {
      const { descricao, preco, categoria, estoque } = req.body;

      if (!descricao || preco === undefined) {
        return res.status(400).json({
          erro: "Descrição e preço são obrigatórios"
        });
      }

      if (Number(preco) < 0) {
        return res.status(400).json({
          erro: "O preço não pode ser negativo"
        });
      }

      if (estoque !== undefined && (!Number.isInteger(Number(estoque)) || Number(estoque) < 0)) {
        return res.status(400).json({
          erro: "O estoque deve ser um número inteiro não negativo"
        });
      }

      const produto = await Produto.criar({
        descricao,
        preco: Number(preco),
        categoria: categoria || null,
        estoque: estoque === undefined ? 0 : Number(estoque)
      });

      return res.status(201).json(produto);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        erro: "Erro ao cadastrar produto"
      });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = Number(req.params.id);
      const { descricao, preco, categoria, estoque } = req.body;

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          erro: "ID inválido"
        });
      }

      const existente = await Produto.buscarPorId(id);

      if (!existente) {
        return res.status(404).json({
          erro: "Produto não encontrado"
        });
      }

      const dados = {};

      if (descricao !== undefined) dados.descricao = descricao;
      if (categoria !== undefined) dados.categoria = categoria;

      if (preco !== undefined) {
        if (Number(preco) < 0) {
          return res.status(400).json({
            erro: "O preço não pode ser negativo"
          });
        }

        dados.preco = Number(preco);
      }

      if (estoque !== undefined) {
        if (!Number.isInteger(Number(estoque)) || Number(estoque) < 0) {
          return res.status(400).json({
            erro: "O estoque deve ser um número inteiro não negativo"
          });
        }

        dados.estoque = Number(estoque);
      }

      if (Object.keys(dados).length === 0) {
        return res.status(400).json({
          erro: "Nenhum campo válido foi informado para atualização"
        });
      }

      const produtoAtualizado = await Produto.atualizar(id, dados);
      return res.json(produtoAtualizado);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        erro: "Erro ao atualizar produto"
      });
    }
  }

  static async excluir(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          erro: "ID inválido"
        });
      }

      const existente = await Produto.buscarPorId(id);

      if (!existente) {
        return res.status(404).json({
          erro: "Produto não encontrado"
        });
      }

      await Produto.excluir(id);

      return res.status(204).send();
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        erro: "Erro ao excluir produto"
      });
    }
  }
}

module.exports = ProdutoController;
