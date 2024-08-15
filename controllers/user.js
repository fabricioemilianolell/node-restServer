const { response, request } = require("express");
const Usuario = require("../models/usuarios.js");
const bcryptjs = require("bcryptjs");


const usuariosGet = (req = request ,res = response)=> {

    const query = req.query

    res.json({
        msg: "get API - controlador",
        query
    })
}
 
const usuariosPost = async (req,res = response) => {

    

    const { nombre,correo,password,rol } = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) {
        return res.status(400).json({
            msg: "el correo está registrado" 
        })
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)

    //guardar en base de datos
    await usuario.save();

    res.json({
        usuario
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