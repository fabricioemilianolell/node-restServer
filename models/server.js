const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth: "api/auth",
            buscar: "api/buscar",
            usuarios: "api/usuarios",
            categorias: "api/categorias",
            productos: "api/productos",
        }
        
        //conectar base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        //rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        //directorio público
        this.app.use(express.static("public"))
    }
    

    routes() {
        this.app.use(this.paths.auth, require("../routes/user"))
        this.app.use(this.paths.buscar, require("../routes/user"))
        this.app.use(this.paths.usuarios, require("../routes/user"))
        this.app.use(this.paths.categorias, require("../routes/categorias"))
        this.app.use(this.paths.productos, require("../routes/categorias"))
    }

    listen() {
        this.app.listen(this.port, ()=> { 
            console.log(`escuchando en el puerto ${this.port}`)
        })
        
    }
}

module.exports = Server