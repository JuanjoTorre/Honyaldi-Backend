/********************************************************************CONTROLADOR DE RESTRINGIDO
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

const { request, response } = require("express");

const modelRestringido = require("../models/modelRestringido");

/*************************METODOS DEL CONTROLADOR DE RESTRINGIDO
 ************************************************************************/

/********CREAR UN NUEVO RESTRINGIDO
 ***************************************/
const nuevoRT = async (req = request, res = response) => {
	//Obtengo los datos que vienen en el body
	const { name } = req.body;

	try {
		//Comprobamos que el restringido no  exista en la bd
		let restringido = await modelRestringido.findOne({ name });

		if (restringido) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un restringido con ese nombre",
			});
		}

		//Creamos un objeto de restringido con los datos que llegan por params
		restringido = new modelRestringido(req.body);

		//Grabo el restringido en la base de datos
		await restringido.save();

		//Si todo va correcto
		return res.status(201).json({
			status: "success",
			msg: "Restringido guardado en la base de datos",
			restringido: restringido,
		});

		//Capturamos el posible error
	} catch (error) {
		console.log("error");
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del restringido",
		});
	}
};

/************BORRAR UN  RESTRINGIDO
 **************************************/
const borrarRT = async (req = request, res = response) => {
	//Conseguimos el id del restringido. Nos llegara a traves de la url
	const rtId = req.params.id;

	//Buscamos el restringido en la base de datos
	try {
		const restringido = await modelRestringido.findById(rtId);

		if (!restringido) {
			return res.status(400).json({
				status: "error",
				msg: "Restringido no encontrado",
			});
		}

		//Borramos el restringido y Devolvemos la respuesta
		const restringidoBorrado = await modelRestringido.findByIdAndDelete(
			rtId
		);
		return res.status(200).json({
			status: "success",
			msg: "Restringido borrado",
			restringido: restringidoBorrado,
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/************EDITAR UN  RESTRINGIDO
 **************************************/
const editarRT = async (req = request, res = response) => {
	//Conseguimos el id del restringido (llega por url)
	const rtId = req.params.id;

	//Validamos que  exista un restringido con ese id
	try {
		const restringido = await modelRestringido.findById(rtId);

		//Si el restringido no existe
		if (!restringido) {
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

	//Conseguimos los nuevos datos del generico
	const rtToEdit = req.body;

	//Buscamos y actualizamos el restringido en la bbdd
	try {
		const rtActualizado = await modelRestringido.findByIdAndUpdate(
			rtId,
			rtToEdit,
			{ new: true }
		);

		//Devolvemos la respuesta con exito o fracaso
		if (!rtActualizado) {
			return res.status(400).json({
				status: "error",
				msg: "Error en la actualizacion",
			});
		} else {
			return res.status(200).json({
				status: "success",
				msg: `El restringido ${rtActualizado.name} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error gral en la actualizacion",
		});
	}
};

/**********LISTAR  LOS RESTRINGIDOS
 **************************************/
const todosRT = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await modelRestringido.find().sort({ name: "asc" });

		//Calculamos el numero de genericos
		let totalRT = await modelRestringido.find();

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
				total: totalRT.length,
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
	nuevoRT,
	borrarRT,
	editarRT,
	todosRT,
};
