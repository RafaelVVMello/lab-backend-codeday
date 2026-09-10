const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      erro: "Token não informado"
    });
  }

  const [tipo, token] = authorization.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      erro: "Formato de token inválido. Use: Bearer <token>"
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = payload;
    next();
  } catch (erro) {
    return res.status(401).json({
      erro: "Token inválido ou expirado"
    });
  }
}

module.exports = autenticar;
