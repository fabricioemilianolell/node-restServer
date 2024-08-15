 
 const { Schema,model } = require("mongoose");

 const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, "el nombre es obligatorio"]
    },
    correo: {
        type: String,
        require: [true, "el correo es obligatorio"],
        unique: true
    },
    password: {
        type: String, 
        require: [true, "el password es obligatorio"],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        emun: ["ADMIN_ROLE","USER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
 })

 module.exports = model("Usuario ",  usuarioSchema)