/*************MIDDLEWARE DE VALIDACION DE CAMPOS DEL  LOGIN
 ******************************************************************/

const { response, request } = require("express");
const { validationResult } = require("express-validator");

//Esta funcion es una capa de control de errores.
//Controla que cuando introducimos los datos del login o de nuevo usuario, los campos del formulario este  llenos.
//Es llamado en el archivo de rutas
const validarCampos = (req = request, res = response, next) => {
	//Manejo de errores
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: false,
			errors: errors.mapped(),
		});
	}
	next();
};

module.exports = {
	validarCampos,
};
