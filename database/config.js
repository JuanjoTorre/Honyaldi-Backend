/**********************ARCHIVO DE CONEXION A LA BASE DE DATOS
 ******************************************************************/
//Importo mongoose
const mongoose = require("mongoose");

//Metodo de conexion a la base de datos
const dbConnection = async () => {
	try {
		//Los datos de conexion a la base de datos vienen dentro de una variable de entorno(process.env.DB_CNN)
		await mongoose.connect(process.env.DB_CNN);
		console.log("DB online");
	} catch (error) {
		console.log(error);
		throw new Error("Error en la conexion con la base de datos");
	}
};

module.exports = {
	dbConnection,
};
