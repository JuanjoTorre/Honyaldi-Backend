/*********************************************************************************RUTAS DE DIRIGIDO
 * host+/api/dirigido
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
	nuevoDR,
	borrarDR,
	editarDR,
	todosDR,
} = require("../controllers/controllersDirigido");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo dirigido
router.post(
	"/nuevoDirigido",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	nuevoDR
);
//Ruta de borrado de dirigido
router.delete("/borrarDirigido/:id", borrarDR);
//Ruta de edicion de dirigido
router.put(
	"/editarDirigido/:id",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	editarDR
);
//Ruta de listado de los dirigidos
router.get("/listarDirigido", todosDR);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
