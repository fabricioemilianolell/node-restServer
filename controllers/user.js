const { response, request } = require("express");

const usuariosGet = (req = request ,res = response)=> {

    const query = req.query

    res.json({
        msg: "get API - controlador",
        query
    })
}

const usuariosPost = (req,res = response) => {

    const body = req.body;

    res.json({
        msg: "post API",
        body
    })
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: "put API",
        id
    })
}
const usuariosPath = (req, res = response) => {
    res.json({
        ok: true,
        msg: "path API"
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Delete API"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete
}