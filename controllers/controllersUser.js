/***************************************************************************CONTROLADOR DE USERS
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/
//Dependencias y modulos
const bcrypt = require("bcryptjs");
const { response, request } = require("express");

//Modelos
const modelUser = require("../models/modelUser");

/****************************************************METODOS DE USERS
 ************************************************************************/

/******************************************NUEVO USER
 ******************************************************/
const nuevoUser = async (req = request, res = response) => {
	//Recogemos los datos que vienen por el body
	const { name, password } = req.body;

	try {
		//Comprobamos que el user no  exista en la bd
		let user = await modelUser.findOne({ name });
		if (user) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un usuario con ese nombre",
			});
		}

		//Creamos un objeto de user con los datos que llegan por params
		user = new modelUser(req.body);

		//Ciframos la contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		//Grabo el user en la base de datos
		await user.save();

		//Si todo va correcto
		res.status(201).json({
			status: "success",
			msg: "Usuario guardado en la base de datos",
			user: user,
		});

		//Capturamos el posible error
	} catch (error) {
		console.log("error");
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del usuario",
		});
	}
};

/**********************************LOGIN DE  USUARIO
 ******************************************************/
const login = async (req = request, res = response) => {
	//Comprobamos que nos llegan dos parametros por el body
	const { name, password } = req.body;

	if (!name || !password) {
		return res.status(500).json({
			status: "error",
			msg: "Datos incompletos",
		});
	}

	//Buscamos en la bbdd si el user ya existe
	try {
		const user = await modelUser.findOne({ name });

		if (!user) {
			return res.status(400).json({
				status: "error",
				msg: "El usuario no existe",
			});
		}

		//Comprobamos la contraseña
		const pwd = bcrypt.compareSync(password, user.password);
		if (!pwd) {
			return res.status(400).json({
				status: "error",
				msg: "Contraseña no válida",
			});
		}

		//Si todo es correcto
		return res.status(200).json({
			status: "success",
			msg: user,
		});
	} catch (error) {
		//Capturamos el posible error
		return res.status(500).json({
			status: "error",
			msg: "Ha fallado la consulta",
		});
	}
};

/********************************************EXPORTAMOS LOS METODOS
 ************************************************************************/
module.exports = {
	nuevoUser,
	login,
};
