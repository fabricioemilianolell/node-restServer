const {response} = require("express");
const jwt = requiere("jsonwebtoken");

const Usuario = require("../models/usuarios")

const esAdminRole = () => {

    if(!req.usuario) {
        return response.status(500).json({
            msg: "se quiere verificar el role sin validar el token primero"
        })
    }
    
    const { rol,nombre } = req.usuario;

    if(rol !== "ADMIN-ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        })
    }
    next()
}


const tieneRol = ( ...roles ) => {
    
    return (req, res=response,next) => {
        
        if(!req.usuario) {
            return response.status(500).json({
                msg: "se quiere verificar el role sin validar el token primero"
            })
        }

        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}


module.exports = {
    esAdminRole
}