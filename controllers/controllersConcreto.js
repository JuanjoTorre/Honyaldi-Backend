/**********************************************************************CONTROLADOR DE CONCRETOS
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

const { request, response } = require("express");

const modelConcreto = require("../models/modelConcreto");

/***************************METODOS DEL CONTROLADOR DE CONCRETOS
 ************************************************************************/

/************CREAR UN NUEVO CONCRETO
 ***************************************/
const nuevoCR = async (req = request, res = response) => {
	//Obtengo los datos que vienen en el body
	const { name } = req.body;

	try {
		//Comprobamos que el concreto no  exista en la bd
		let concreto = await modelConcreto.findOne({ name });

		if (concreto) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un concreto con ese nombre",
			});
		}

		//Creamos un objeto de concreto con los datos que llegan por params
		concreto = new modelConcreto(req.body);

		//Grabo el concreto en la base de datos
		await concreto.save();

		//Si todo va correcto
		return res.status(201).json({
			status: "success",
			msg: "Concreto guardado en la base de datos",
			concreto: concreto,
		});

		//Capturamos el posible error
	} catch (error) {
		console.log("error");
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del concreto",
		});
	}
};

/****************BORRAR UN  CONCRETO
 **************************************/
const borrarCR = async (req = request, res = response) => {
	//Conseguimos el id del concreto. Nos llegara a traves de la url
	const crId = req.params.id;

	//Buscamos el concreto en la base de datos
	try {
		const concreto = await modelConcreto.findById(crId);

		if (!concreto) {
			return res.status(400).json({
				status: "error",
				msg: "Concreto no encontrado",
			});
		}

		//Borramos el concreto y Devolvemos la respuesta
		const concretoBorrado = await modelConcreto.findByIdAndDelete(crId);
		return res.status(200).json({
			status: "success",
			msg: "Concreto borrado",
			product: concretoBorrado,
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/****************EDITAR UN  CONCRETO
 **************************************/
const editarCR = async (req = request, res = response) => {
	//Conseguimos el id del concreto (llega por url)
	const crId = req.params.id;

	//Validamos que  exista un concreto con ese id
	try {
		const concreto = await modelConcreto.findById(crId);

		//Si el concreto no existe
		if (!concreto) {
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

	//Conseguimos los nuevos datos del concreto
	const crToEdit = req.body;

	//Buscamos y actualizamos el concreto en la bbdd
	try {
		const crActualizado = await modelConcreto.findByIdAndUpdate(
			crId,
			crToEdit,
			{ new: true }
		);

		//Devolvemos la respuesta con exito o fracaso
		if (!crActualizado) {
			return res.status(400).json({
				status: "error",
				msg: "Error en la actualizacion",
			});
		} else {
			return res.status(200).json({
				status: "success",
				msg: `El concreto ${crActualizado.name} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error gral en la actualizacion",
		});
	}
};

/**************LISTAR  LOS CONCRETOS
 **************************************/
const todosCR = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await modelConcreto.find().sort({ name: "asc" });

		//Calculamos el numero de concretos
		let totalCR = await modelConcreto.find();

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
				total: totalCR.length,
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
	nuevoCR,
	borrarCR,
	editarCR,
	todosCR,
};
