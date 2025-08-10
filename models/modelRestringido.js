/**************************************************************************MODELO DE RESTRINGIDO
 ****************************************************************************************************/

/****************************************IMPORTACIONES
 *********************************************************/
const { Schema, model } = require("mongoose");

/**********************************DEFINIMOS EL SCHEMA
 **********************************************************/
const RestringidoSchema = Schema({
	name: {
		type: String,
		required: true,
	},
});

//Este modelo se va a llamar "modelRestringido"
//El schema que va a usar este modelo es "RestringidoSchema"
//Y se va a guardar en la coleccion "restringidos"
module.exports = model("modelRestringido", RestringidoSchema, "restringidos");
