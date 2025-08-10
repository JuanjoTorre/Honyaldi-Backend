/********************************************************************************RUTAS DE GENERICO
 * host+/api/generico
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
	nuevoGR,
	borrarGR,
	editarGR,
	todosGR,
} = require("../controllers/controllersGenerico");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo generico
router.post(
	"/nuevoGenerico",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	nuevoGR
);
//Ruta de borrado de generico
router.delete("/borrarGenerico/:id", borrarGR);
//Ruta de edicion de genericoo
router.put(
	"/editarGenerico/:id",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	editarGR
);
//Ruta de listado de los dirigidos
router.get("/listarGenerico", todosGR);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
