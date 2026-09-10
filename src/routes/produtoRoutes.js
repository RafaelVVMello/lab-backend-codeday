const express = require("express");
const ProdutoController = require("../controllers/ProdutoController");
const autenticar = require("../middleware/auth");

const router = express.Router();

router.get("/", ProdutoController.listar);
router.get("/:id", ProdutoController.buscarPorId);

router.post("/", autenticar, ProdutoController.criar);
router.put("/:id", autenticar, ProdutoController.atualizar);
router.delete("/:id", autenticar, ProdutoController.excluir);

module.exports = router;
