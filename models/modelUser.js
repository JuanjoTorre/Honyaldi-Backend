/**********************************************************MODELO DE USER
 ***************************************************************************/

/****************************************IMPORTACIONES
 *********************************************************/
const { Schema, model } = require("mongoose");

/**********************************DEFINIMOS EL SCHEMA
 **********************************************************/
const UserSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

//Este modelo se va a llamar "modelUser"
//El schema que va a usar este modelo es "UserSchema"
//Y se va a guardar en la coleccion "users"
module.exports = model("modelUser", UserSchema, "users");
