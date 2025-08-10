/****************************************************************************RUTAS DE RESTRINGIDO
 * host+/api/restringido
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
	nuevoRT,
	borrarRT,
	editarRT,
	todosRT,
} = require("../controllers/controllersRestringido");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo restringido
router.post(
	"/nuevoRestringido",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	nuevoRT
);
//Ruta de borrado de restringido
router.delete("/borrarRestringido/:id", borrarRT);
//Ruta de edicion de restringidoo
router.put(
	"/editarRestringido/:id",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	editarRT
);
//Ruta de listado de los dirigidos
router.get("/listarRestringido", todosRT);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
