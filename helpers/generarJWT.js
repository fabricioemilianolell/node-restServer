const jwt = require("jsonwebtoken");

const generarJWT = ( uid = "" ) => {
    
    return new Promise( (resolve,reject) => {
        const payload = {
            uid,
        }

        jwt.sign(payload, proccess.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"
        },(err,token) => {
           if(err) {
            console.log(err)
            reject("no se pudo generar el token")
           } else {
            resolve(token)
           }
        })
    })
}

module.exports = {
    generarJWT
}