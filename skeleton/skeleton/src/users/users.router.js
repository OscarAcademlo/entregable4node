const router = require('express').Router()
const passport = require('passport')  //* Para rutas protegidas

const userServices = require('./users.services')
require('../middlewares/auth.middleware')(passport) //* Para rutas protegidas

//? rutas raiz

// router.get('/',
// passport.authenticate('jwt',{session:false}),
// userServices.getAllUsers)

router.get('/',userServices.getAllUsers)  // No protegida

//TODO el registerUser ira en la ruta /auth/register

//! router.route('/').get( userServices.getAllUsers)

//? rutas dinamicas por ID /users/:id

//! router.get('/:id')
//! router.patch('/:id')
//! router.put('/:id')
//! router.delete('/:id')
//! /api/v1/users/

//?Se pone antes para que no quede como un parametro dentro de la ruta
//?Se usan los mismos controladores
router.route('/me')   //?No requiere un id, solo el propio dueño de cta
.get(passport.authenticate('jwt',{session:false}),userServices.getMyUser)
.patch(passport.authenticate('jwt',{session:false}),userServices.pathMyUser)
.delete(passport.authenticate('jwt',{session:false}),userServices.deleteMyUser)

router.route('/:id')
    .get(userServices.getUserById)
    .patch(userServices.patchUser)    //?Admin
    .delete(userServices.deleteUser)  //?Admin



module.exports = router