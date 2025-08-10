/********************************************************************************RUTAS DE PRODUCTO
 * host+/api/producto
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
	nuevoPRD,
	borrarPRD,
	editarPRD,
	todosPRD,
	selectPRD,
	todosPRDPRV,
	todosPRDRTG,
	todosPRDGNR,
	todosPRDCRT,
	todosPRDDRG,
} = require("../controllers/controllersProducto");
const { validarCampos } = require("../middlewares/validarCampos");

/******************************************************************RUTAS
 ************************************************************************/
//Ruta de nuevo producto
router.post(
	"/nuevoProducto",
	[
		//Middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("codigo", "El codigo es obligatorio").not().isEmpty(),
		check("proveedor", "El proveedor es obligatorio").not().isEmpty(),
		check("generico", "El generico es obligatorio").not().isEmpty(),
		check("concreto", "El concreto es obligatorio").not().isEmpty(),
		check("descripcion", "La descripción es obligatoria")
			.not()
			.isEmpty(),
		check("imagen", "La imagen es obligatoria").not().isEmpty(),
		validarCampos,
	],
	nuevoPRD
);
//Ruta de borrado de producto
router.delete("/borrarProducto/:codigo", borrarPRD);
//Ruta de edicion de producto
router.put("/editarProducto/:codigo", editarPRD);
//Ruta de listado de los productos
router.get("/listarProductos", todosPRD);
//Ruta de seleccion de un producto
router.get("/producto/:codigo", selectPRD);
//Ruta de listado de los productos de un proveedor
router.get("/listarProductosProveedor/:proveedor", todosPRDPRV);
//Ruta de listado de los productos de un restringido
router.get("/listarProductosRestringido/:restringido", todosPRDRTG);
//Ruta de listado de los productos de un generico
router.get("/listarProductosGenerico/:generico", todosPRDGNR);
//Ruta de listado de los productos de un concreto
router.get("/listarProductosConcreto/:concreto", todosPRDCRT);
//Ruta de listado de los productos de un dirigido
router.get("/listarProductosDirigido/:dirigido", todosPRDDRG);

/***********************************************EXPORTAMOS EL ROUTER
 ************************************************************************/
module.exports = router;
