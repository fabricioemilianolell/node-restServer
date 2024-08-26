const role = require("../models/role");
const Usuario = require(" ../models/usuarios");
const Categoria = require(" ../models/usuarios");
const Producto = require(" ../models/usuarios");

const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol) {
        throw new Error(`el rol no está registrado`)
    }
}

const emailExiste = async(correo = "") => {
    const existeEmail = await Usuario.findOne({correo})
    
    if(existeEmail) {
        throw new Error(`El correo: ${correo} ya está registrado`)
        }
}

const existeUsuarioPorId = async(id = "") => {
    const existeUsuario = await Usuario.findById(id)
    
    if(!existeUsuario) {
        throw new Error(`el id no existe ${id}`)
        }
}

 const existeCategoriaPorID = async(id = "") => {
        
    const existeCategoria = await Categoria.findById(id)
        
        if(!existeCategoria) {
            throw new Error(`el id no existe ${id}`)    
        }
}


// productos

const existeProductoPorID = async(id = "") => {
        
    const existeProducto = await Producto.findById(id)
        
        if(!existeProducto) {
            throw new Error(`el id no existe ${id}`)    
        }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorID,
    existeProductoPorID
}