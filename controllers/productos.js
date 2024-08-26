const { response } = require("express");
const { Producto } = require("../models")


//ObtenerCategorias - paginado - total - populate
const obtenerProductos = async (req,res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;

    const [ total, productos ] = await  Promise.all([
        Productos.countDocuments({estado:true}),
        v .find({estado:true})
            .populate("usuario","nombre")
            .populate("categoria","nombre")
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
       total,
       productos
    })
}

//ObtenerCategorias - populate {}
const obtenerProducto = async(req, res = response) => {
    const { } = req.params;
    const categoria = await Producto.findById(id)
                            .populate("usuario","nombre")
                            .populate("categoria","nombre")

    res.json(producto);
}


const crearProducto = async (req, res = response) => {

    const { estado,usuario,...body } = req.body;

    const productoDB = await Categoria.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto  ${productoDB.nombre} ya existe`
        })
    }


//Generar la data a guardar

const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id
}

const producto = new Producto(data);

//Guardar DB
await producto.save()

res.status(201).json(producto)

}

//ActualizarCategoria

const actualizarProducto = async(req,res = response) => {

    const {id} = req.params;
    const { estado,usuario,...data } = req.body;

    if(data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);

}

// BorrarCategoria
const borrarProducto = async(req,res=response) => {

    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    
    res.json(productoBorrado);
}   

module.exports = {
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
    obtenerProductos
}