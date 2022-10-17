//* Crear controlador (users.controllers.js)
//* Necesitamosemail y contraseña del usuario

const { getUserByEmail } = require("../users/users.controllers")
const {comparePassword} = require('../utils/crypto')

//? El email es unico siempre en la BD
//? (email,password) Vienen del cliente formulario y son textos planos
//? data.password viene de la BD y esta encriptada
const loginUser = async (email,password) =>{
    try {
        const data = await getUserByEmail(email)
        const verifyPassword = comparePassword(password,data.password) //Retorna true o false
        if (verifyPassword){
            return data
        }else {
            return false
        }
    } catch (error) {
        return error
    }
}

// loginUser('leonardog166@gmail.com','12345678')
// .then(response => console.log(response))
// .catch(err => console.log(err))

module.exports = {
    loginUser
}