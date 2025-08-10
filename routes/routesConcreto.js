/*******************************************************************************RUTAS DE CONCRETO
 * host+/api/concreto
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
	nuevoCR,
	borrarCR,
	editarCR,
	todosCR,
} = require("../controllers/controllersConcreto");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo concreto
router.post(
	"/nuevoConcreto",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	nuevoCR
);
//Ruta de borrado de concreto
router.delete("/borrarConcreto/:id", borrarCR);
//Ruta de edicion de concreto
router.put(
	"/editarConcreto/:id",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	editarCR
);
//Ruta de listado de los concreto
router.get("/listarConcreto", todosCR);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
