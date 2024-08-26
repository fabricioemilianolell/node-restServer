const { response } = require("express");
const { ObjectId } = require("mongoose");
const {Usuario,Categoria,Producto} = require("../models/usuarios");


const coleccionesPermitidas = [
    "usuarios",
    "categoria",
    "productos",
    "roles"
]



const buscarUsuarios = async(termino = "",res = response) => {
        
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: usuario ? [usuario]: []
        });
    }

    const regex = new RegExp(termino, "i");

   

    const usuarios = await Usuario.find({
        $or: [ {nombre:regex, estado:true},{correo:regex, estado:true} ],
        $and: [ {estado: true} ]
     });

    res.json({
        results: usuarios
    })
}

res.json({
    msg: "Buscar...."
})



const buscarCategorias = async(termino = "",res = response) => {
        
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria]: []
        });
    }

    const regex = new RegExp(termino, "i");

    const categorias = await Categoria.find({
        nombre:regex, estado:true
    }
        );

    res.json({
        results: cate
    })
}

res.json({
    msg: "Buscar...."
})


const buscarProductos = async(termino = "",res = response) => {
        
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID) {
        const producto = await Producto.findById(termino).populate("categoria","nombre");
        return res.json({
            results: producto ? [producto]: []
        });
    }

    const regex = new RegExp(termino, "i");

    const productos = await Producto.find({nombre:regex, estado:true}
                            .populate("categoria","nombre")
    );

    res.json({
        results: productos
    })
}

res.json({
    msg: "Buscar...."
})


const buscar = (req,res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: "las colecciones no son correctas"
        })

    }

    switch(coleccion) {
        case "usuario":
            buscarUsuarios(termino, res)
        break
        case "categoria":
            buscarCategorias(termino,res)
        break
        case "productos":
            buscarProductos(termino,res)
        break

        default: 
            res.status(500).json({
                msg: "se me olvido hacer esta búsqueda"
            })
    }

    res.json({
        coleccion,termino
    })
}




module.exports = {
    buscar
}