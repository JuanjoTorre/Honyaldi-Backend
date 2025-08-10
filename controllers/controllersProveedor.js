/**********************************************************************CONTROLADOR DE PROVEEDOR
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

const { request, response } = require("express");

const modelProveedor = require("../models/modelProveedor");

/***************************METODOS DEL CONTROLADOR DE PROVEEDOR
 ************************************************************************/

/**********CREAR UN NUEVO PROVEEDOR
 ***************************************/
const nuevoPR = async (req = request, res = response) => {
	//Obtengo los datos que vienen en el body
	const { name } = req.body;

	try {
		//Comprobamos que el proveedor no  exista en la bd
		let proveedor = await modelProveedor.findOne({ name });

		if (proveedor) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un proveedor con ese nombre",
			});
		}

		//Creamos un objeto de proveedor con los datos que llegan por params
		proveedor = new modelProveedor(req.body);

		//Grabo el dirigido en la base de datos
		await proveedor.save();

		//Si todo va correcto
		return res.status(201).json({
			status: "success",
			msg: "Proveedor guardado en la base de datos",
			proveedor: proveedor,
		});

		//Capturamos el posible error
	} catch (error) {
		console.log("error");
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del proveedor",
		});
	}
};

/**************BORRAR UN  PROVEEDOR
 **************************************/
const borrarPR = async (req = request, res = response) => {
	//Conseguimos el id del proveedor. Nos llegara a traves de la url
	const prId = req.params.id;

	//Buscamos el proveedor en la base de datos
	try {
		const proveedor = await modelProveedor.findById(prId);

		if (!proveedor) {
			return res.status(400).json({
				status: "error",
				msg: "Proveedor no encontrado",
			});
		}

		//Borramos el proveedor y Devolvemos la respuesta
		const proveedorBorrado = await modelProveedor.findByIdAndDelete(
			prId
		);
		return res.status(200).json({
			status: "success",
			msg: "Proveedor borrado",
			proveedor: proveedorBorrado,
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/**************EDITAR UN  PROVEEDOR
 **************************************/
const editarPR = async (req = request, res = response) => {
	//Conseguimos el id del proveedor (llega por url)
	const prId = req.params.id;

	//Validamos que  exista un proveedor con ese id
	try {
		const proveedor = await modelProveedor.findById(prId);

		//Si el proveedor no existe
		if (!proveedor) {
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

	//Conseguimos los nuevos datos del proveedor
	const prToEdit = req.body;

	//Buscamos y actualizamos el proveedor en la bbdd
	try {
		const prActualizado = await modelProveedor.findByIdAndUpdate(
			prId,
			prToEdit,
			{ new: true }
		);

		//Devolvemos la respuesta con exito o fracaso
		if (!prActualizado) {
			return res.status(400).json({
				status: "error",
				msg: "Error en la actualizacion",
			});
		} else {
			return res.status(200).json({
				status: "success",
				msg: `El proveedor ${prActualizado.name} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error gral en la actualizacion",
		});
	}
};

/***********LISTAR  LOS PROVEEDORES
 **************************************/
const todosPR = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await modelProveedor.find().sort({ name: "asc" });

		//Calculamos el numero de proveedores
		let totalPR = await modelProveedor.find();

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
				total: totalPR.length,
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
	nuevoPR,
	borrarPR,
	editarPR,
	todosPR,
};
