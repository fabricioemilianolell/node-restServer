const { crearCategoria, obtenerCategorias, obtenerCategoria,actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorID } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRole } = require("../middlewares/validarJWT");
const { Router } = requiere("express");
const { check } = requiere("express-validator");



const router = Router();

//url api/categorias

//Obtener todas las categorias
router.get("/",obtenerCategorias)

//Obtener una categoria por ID - público
router.get("/:id",[
    check("id","No es un id de mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
], obtenerCategoria)

//Crear categoría - privado - cualquier persona con un token válido
router.post("/", 
    [validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    validarCampos], 
    crearCategoria);

//Actualizar - privado - cualquiera con token válido
router.put("/:id",[
    validarJWT,
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorID),
    validarCampos
],actualizarCategoria);

//Borrar una categoria - Admin
router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check("id","No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorID),
    validarCampos
],borrarCategoria);


module.exports = router;