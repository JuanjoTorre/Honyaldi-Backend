/************************************************************************CONTROLADOR DE GENERICO
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

const { request, response } = require("express");

const modelGenerico = require("../models/modelGenerico");

/*****************************METODOS DEL CONTROLADOR DE GENERICO
 ************************************************************************/

/************CREAR UN NUEVO GENERICO
 ***************************************/
const nuevoGR = async (req = request, res = response) => {
	//Obtengo los datos que vienen en el body
	const { name } = req.body;

	try {
		//Comprobamos que el dirigido no  exista en la bd
		let generico = await modelGenerico.findOne({ name });

		if (generico) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un generico con ese nombre",
			});
		}

		//Creamos un objeto de dirigido con los datos que llegan por params
		generico = new modelGenerico(req.body);

		//Grabo el dirigido en la base de datos
		await generico.save();

		//Si todo va correcto
		return res.status(201).json({
			status: "success",
			msg: "Generico guardado en la base de datos",
			generico: generico,
		});

		//Capturamos el posible error
	} catch (error) {
		console.log("error");
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del generico",
		});
	}
};

/****************BORRAR UN  GENERICO
 **************************************/
const borrarGR = async (req = request, res = response) => {
	//Conseguimos el id del generico. Nos llegara a traves de la url
	const grId = req.params.id;

	//Buscamos el generico en la base de datos
	try {
		const generico = await modelGenerico.findById(grId);

		if (!generico) {
			return res.status(400).json({
				status: "error",
				msg: "Generico no encontrado",
			});
		}

		//Borramos el generico y Devolvemos la respuesta
		const genericoBorrado = await modelGenerico.findByIdAndDelete(grId);
		return res.status(200).json({
			status: "success",
			msg: "Generico borrado",
			generico: genericoBorrado,
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/****************EDITAR UN  GENERICO
 **************************************/
const editarGR = async (req = request, res = response) => {
	//Conseguimos el id del generico (llega por url)
	const grId = req.params.id;

	//Validamos que  exista un generico con ese id
	try {
		const generico = await modelGenerico.findById(grId);

		//Si el generico no existe
		if (!generico) {
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
	const grToEdit = req.body;

	//Buscamos y actualizamos el generico en la bbdd
	try {
		const grActualizado = await modelGenerico.findByIdAndUpdate(
			grId,
			grToEdit,
			{ new: true }
		);

		//Devolvemos la respuesta con exito o fracaso
		if (!grActualizado) {
			return res.status(400).json({
				status: "error",
				msg: "Error en la actualizacion",
			});
		} else {
			return res.status(200).json({
				status: "success",
				msg: `El generico ${grActualizado.name} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error gral en la actualizacion",
		});
	}
};

/**************LISTAR  LOS GENERICOS
 **************************************/
const todosGR = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await modelGenerico.find().sort({ name: "asc" });

		//Calculamos el numero de genericos
		let totalGR = await modelGenerico.find();

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
				total: totalGR.length,
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
	nuevoGR,
	borrarGR,
	editarGR,
	todosGR,
};
