/******************************************************************************RUTAS DE PROVEEDOR
 * host+/api/proveedor
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
	nuevoPR,
	borrarPR,
	editarPR,
	todosPR,
} = require("../controllers/controllersProveedor");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo proveedor
router.post(
	"/nuevoProveedor",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	nuevoPR
);
//Ruta de borrado de proveedor
router.delete("/borrarProveedor/:id", borrarPR);
//Ruta de edicion de proveedor
router.put(
	"/editarProveedor/:id",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	editarPR
);
//Ruta de listado de los proveedores
router.get("/listarProveedor", todosPR);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
