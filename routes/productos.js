const { crearProducto, obtenerProductos, obtenerProducto,actualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeCategoriaPorID, existeProductoPorID } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRole } = require("../middlewares/validarJWT");
const { Router } = requiere("express");
const { check } = require("express-validator");



const router = Router();

//url api/categorias

//Obtener todas las categorias
router.get("/",obtenerProductos)

//Obtener una categoria por ID - público
router.get("/:id",[
    check("id","No es un id de mongo válido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
], obtenerProducto);

//Crear categoría - privado - cualquier persona con un token válido
router.post("/", 
    [validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("categoria","No es un ID de mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorID),
    validarCampos
],
    crearProducto);

//Actualizar - privado - cualquiera con token válido
router.put("/:id",[
    validarJWT,
    check("categoria","No es un ID de mongo").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos
],actualizarProducto);

//Borrar una categoria - Admin
router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check("id","No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos
],borrarProducto);


module.exports = router;