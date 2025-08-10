/******************************************************************************MODELO DE CONCRETO
 ****************************************************************************************************/

/****************************************IMPORTACIONES
 *********************************************************/
const { Schema, model } = require("mongoose");

/**********************************DEFINIMOS EL SCHEMA
 **********************************************************/
const ConcretoSchema = Schema({
	name: {
		type: String,
		required: true,
	},
});

//Este modelo se va a llamar "modelConcreto"
//El schema que va a usar este modelo es "ConcretoSchema"
//Y se va a guardar en la coleccion "concretos"
module.exports = model("modelConcreto", ConcretoSchema, "concretos");
