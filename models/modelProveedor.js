/****************************************************************************MODELO DE PROVEEDOR
 ****************************************************************************************************/

/****************************************IMPORTACIONES
 *********************************************************/
const { Schema, model } = require("mongoose");

/**********************************DEFINIMOS EL SCHEMA
 **********************************************************/
const ProveedorSchema = Schema({
	name: {
		type: String,
		required: true,
	},
});

//Este modelo se va a llamar "modelProveedor"
//El schema que va a usar este modelo es "ProveedorSchema"
//Y se va a guardar en la coleccion "proveedores"
module.exports = model("modelProveedor", ProveedorSchema, "proveedores");
