const { Router } = require("express");
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPath } = require("../controllers/user");
const { check } = require("express-validator");
const Role = require("../models/role");

const { validarCampos } = require("../middlewares/validar-campos")
const router = Router();


router.get("/", usuariosGet)

router.post("/",[
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio y mas de 6 letras").isLength({ min: 6  }),
    check("correo", "el correo no es valido").isEmail(),
    check("rol").custom( async (rol = "") => {
        const existeRol = await Role.findOne({rol})
        if(!existeRol) {
            throw new Error(`el rol no está registrado`)
        }
    }), 
],usuariosPost)
    
router.put("/:id", usuariosPut)

router.delete("/", usuariosDelete)

router.patch("/", usuariosPath)


module.exports = router;
