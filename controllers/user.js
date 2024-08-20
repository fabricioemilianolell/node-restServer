const { response, request } = require("express");
const Usuario = require("../models/usuarios.js");
const bcryptjs = require("bcryptjs");


const usuariosGet = async(req = request ,res = response)=> {

    const { limite = 5, desde = 0 } = req.query;


    const [ total, usuarios ] = await  Promise.all([
        Usuario.count({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
       total,
       usuarios
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

const usuariosPut = async(req, res = response) => {

    const { id }= req.params
    const { _id, password, google, correo,...resto } = req.body

    //validar contra base de datos
    if(password) {
    //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto .password = bcryptjs.hashSync(password,salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.json({
        usuario
    })
}


const usuariosPath = (req, res = response) => {
    res.json({
        ok: true,
        msg: "path API"
    })
}


const usuariosDelete = async(req, res = response) => {
    
    const { id } = req.params
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    
    res.json(usuario)
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete
}