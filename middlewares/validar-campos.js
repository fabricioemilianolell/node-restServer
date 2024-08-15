const { validationResult } = require("express-validator");


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    //significa que tenes error. not empty
    if(!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {
    validarCampos
}