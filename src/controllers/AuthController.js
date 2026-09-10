const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          erro: "Email e senha são obrigatórios"
        });
      }

      const usuario = await Usuario.buscarPorEmail(email);

      if (!usuario) {
        return res.status(401).json({
          erro: "Usuário ou senha inválidos"
        });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          erro: "Usuário ou senha inválidos"
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      return res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        },
        token
      });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({
        erro: "Erro durante autenticação"
      });
    }
  }

  static validarToken(req, res) {
    return res.json({
      autenticado: true,
      usuario: req.usuario
    });
  }
}

module.exports = AuthController;
