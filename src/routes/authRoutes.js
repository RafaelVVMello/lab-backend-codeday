const express = require("express");
const AuthController = require("../controllers/AuthController");
const autenticar = require("../middleware/auth");

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/validar", autenticar, AuthController.validarToken);

module.exports = router;
