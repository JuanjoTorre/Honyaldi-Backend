/***********************************************************************************RUTAS DE USERS
 * host+/api/user
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { nuevoUser, login } = require("../controllers/controllersUser");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo usuario
router.post(
	"/nuevoUsuario",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").not().isEmpty(),
		check(
			"password",
			"El password debe tener mas de 2 caracteres"
		).isLength({ min: 3 }),
		validarCampos,
	],
	nuevoUser
);

//Ruta de login de usuario
router.post(
	"/login",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").not().isEmpty(),
		check(
			"password",
			"El password debe tener mas de 2 caracteres"
		).isLength({ min: 3 }),
		validarCampos,
	],
	login
);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
