const { Router } = require("express");
const { buscar } = require("../controllers/buscar");

const router = router();

router.get("/:coleccion/:termino",buscar)

module.exports = router;