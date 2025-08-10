/************************************************************************CONTROLADOR DE DIRIGIDO
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

const { request, response } = require("express");

const modelDirigido = require("../models/modelDirigido");

/***************************METODOS DEL CONTROLADOR DE DIRIGIDOS
 ************************************************************************/

/************CREAR UN NUEVO DIRIGIDO
 ***************************************/
const nuevoDR = async (req = request, res = response) => {
	//Obtengo los datos que vienen en el body
	const { name } = req.body;

	try {
		//Comprobamos que el dirigido no  exista en la bd
		let dirigido = await modelDirigido.findOne({ name });

		if (dirigido) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un dirigido con ese nombre",
			});
		}

		//Creamos un objeto de dirigido con los datos que llegan por params
		dirigido = new modelDirigido(req.body);

		//Grabo el dirigido en la base de datos
		await dirigido.save();

		//Si todo va correcto
		return res.status(201).json({
			status: "success",
			msg: "Dirigido guardado en la base de datos",
			dirigido: dirigido,
		});

		//Capturamos el posible error
	} catch (error) {
		console.log("error");
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del dirigido",
		});
	}
};

/****************BORRAR UN  DIRIGIDO
 **************************************/
const borrarDR = async (req = request, res = response) => {
	//Conseguimos el id del dirigido. Nos llegara a traves de la url
	const crId = req.params.id;

	//Buscamos el dirigido en la base de datos
	try {
		const dirigido = await modelDirigido.findById(crId);

		if (!dirigido) {
			return res.status(400).json({
				status: "error",
				msg: "Dirigido no encontrado",
			});
		}

		//Borramos el dirigido y Devolvemos la respuesta
		const dirigidoBorrado = await modelDirigido.findByIdAndDelete(crId);
		return res.status(200).json({
			status: "success",
			msg: "Dirigido borrado",
			dirigido: dirigidoBorrado,
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/****************EDITAR UN  DIRIGIDO
 **************************************/
const editarDR = async (req = request, res = response) => {
	//Conseguimos el id del dirigido (llega por url)
	const drId = req.params.id;

	//Validamos que  exista un dirigido con ese id
	try {
		const dirigido = await modelDirigido.findById(drId);

		//Si el dirigido no existe
		if (!dirigido) {
			return res.status(404).json({
				status: "error",
				msg: "id Incorrecto",
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error de actualizacion de datos",
		});
	}

	//Conseguimos los nuevos datos del dirigido
	const drToEdit = req.body;

	//Buscamos y actualizamos el dirigido en la bbdd
	try {
		const drActualizado = await modelDirigido.findByIdAndUpdate(
			drId,
			drToEdit,
			{ new: true }
		);

		//Devolvemos la respuesta con exito o fracaso
		if (!drActualizado) {
			return res.status(400).json({
				status: "error",
				msg: "Error en la actualizacion",
			});
		} else {
			return res.status(200).json({
				status: "success",
				msg: `El dirigido ${drActualizado.name} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error gral en la actualizacion",
		});
	}
};

/**************LISTAR  LOS DIRIGIDOS
 **************************************/
const todosDR = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await modelDirigido.find().sort({ name: "asc" });

		//Calculamos el numero de concretos
		let totalDR = await modelDirigido.find();

		//Comprobamos y respondemos
		if (!todos) {
			return res.status(400).json({
				status: "error",
				msg: "Error en la consulta",
			});
		} else {
			return res.status(200).json({
				status: "success",
				todos,
				total: totalDR.length,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/********************************************EXPORTAMOS LOS METODOS
 ************************************************************************/
module.exports = {
	nuevoDR,
	borrarDR,
	editarDR,
	todosDR,
};
