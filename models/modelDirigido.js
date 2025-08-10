/******************************************************************************MODELO DE DIRIGIDO
 ****************************************************************************************************/

/****************************************IMPORTACIONES
 *********************************************************/
const { Schema, model } = require("mongoose");

/**********************************DEFINIMOS EL SCHEMA
 **********************************************************/
const DirigidoSchema = Schema({
	name: {
		type: String,
		required: true,
	},
});

//Este modelo se va a llamar "modelDirigido"
//El schema que va a usar este modelo es "DirigidoSchema"
//Y se va a guardar en la coleccion "dirigidos"
module.exports = model("modelDirigido", DirigidoSchema, "dirigidos");
