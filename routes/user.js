const { Router } = require("express");
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPath } = require("../controllers/user");
const { check } = require("express-validator");

const Role = require("../models/role");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators")

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRole } = require("../middlewares/validar-roles");

const router = Router();


router.get("/", usuariosGet)

router.put("/:id",[
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post("/",[
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio y mas de 6 letras").isLength({ min: 6  }),
    check("correo", "el correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido), 
    validarCampos
],usuariosPost)
    

router.delete("/:id",[ 
    // esAdminRole,
    validarJWT,
    tieneRol("ADMIN_ROLE","VENTAS_ROLE"),
    check("id","No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)

router.patch("/", usuariosPath)


module.exports = router;
