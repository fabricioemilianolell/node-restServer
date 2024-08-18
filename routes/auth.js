const { login } = require("../controllers/auth");
const { usuariosGet } = require("../controllers/user");
const { validarCampos } = require("../middlewares/validar-campos");

const { Router } = requiere("express");
const { check } = requiere("express-validator");

const router = Router();

router.post("/login",[
    check("correo","El correo es obligatorio").isEmail(),
    check("password","La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], login)

module.exports = router;