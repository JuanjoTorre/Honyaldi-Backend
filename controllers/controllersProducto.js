/***********************************************************************CONTROLADOR DE PRODUCTO
 ****************************************************************************************************/

/*******IMPORTAMOS LAS DEPENDENCIAS Y METODOS QUE NECESITEMOS
 ************************************************************************/

const { request, response } = require("express");

const modelProducto = require("../models/modelProducto");

/*****************************METODOS DEL CONTROLADOR DE PRODUCTO
 ************************************************************************/

/***********CREAR UN NUEVO PRODUCTO
 ***************************************/
const nuevoPRD = async (req = request, res = response) => {
	//Obtengo los datos que vienen en el body
	const { codigo } = req.body;

	try {
		//Comprobamos que el producto no  exista en la bd
		let producto = await modelProducto.findOne({ codigo });

		if (producto) {
			return res.status(400).json({
				status: "error",
				msg: "Ya existe un producto con ese codigo",
			});
		}

		//Creamos un objeto de producto con los datos que llegan por params
		producto = new modelProducto(req.body);

		//Grabo el producto en la base de datos
		await producto.save();

		//Si todo va correcto
		return res.status(201).json({
			status: "success",
			msg: "Producto guardado en la base de datos",
			producto: producto,
		});

		//Capturamos el posible error
	} catch (error) {
		return res.status(500).json({
			status: "error",
			msg: "Error en la introduccion del producto",
		});
	}
};

/****************BORRAR UN  PRODUCTO
 **************************************/
const borrarPRD = async (req = request, res = response) => {
	//Conseguimos el codigo del producto. Nos llegara a traves de la url
	const prCod = req.params.codigo;

	//Buscamos el producto en la base de datos
	try {
		const producto = await modelProducto.findOne({ codigo: prCod });

		if (!producto) {
			return res.status(400).json({
				status: "error",
				msg: "Producto no encontrado",
			});
		}

		//Borramos el producto y Devolvemos la respuesta
		const productoBorrado = await modelProducto.findOneAndDelete({
			codigo: prCod,
		});

		return res.status(200).json({
			status: "success",
			msg: "Producto borrado",
			producto: productoBorrado,
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error general",
		});
	}
};

/***************EDITAR UN  PRODUCTO
 **************************************/
const editarPRD = async (req = request, res = response) => {
	//Conseguimos el codigo del producto (llega por url)
	const prCod = req.params.codigo;

	//Validamos que  exista un producto con ese codigo
	try {
		const producto = await modelProducto.findOne({ codigo: prCod });

		//Si el producto no existe
		if (!producto) {
			return res.status(404).json({
				status: "error",
				msg: "Codigo Incorrecto",
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error de actualizacion de datos",
		});
	}

	//Conseguimos los nuevos datos del generico
	const prToEdit = req.body;

	//Buscamos y actualizamos el producto en la bbdd
	try {
		const prActualizado = await modelProducto.findOneAndUpdate(
			{ codigo: prCod },
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
				msg: `El producto ${prActualizado.name} ha sido actualizado con exito`,
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Error gral en la actualizacion",
		});
	}
};

/*************LISTAR  LOS PRODUCTOS
 **************************************/
const todosPRD = async (req, res) => {
	//Hacemos la consulta
	try {
		const todos = await modelProducto
			.find()
			.sort({ oferta: "desc", codigo: "asc" });

		//Calculamos el numero de productos
		let totalPR = await modelProducto.find();

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

/**********SELECCIONAR UN PRODUCTO
 **************************************/
const selectPRD = async (req, res) => {
	//Conseguimos el id del producto. Nos llegara a traves de la url
	const prCod = req.params.codigo;

	//Buscamos el producto en la base de datos y lo devolvemos
	try {
		const producto = await modelProducto.findOne({ codigo: prCod });

		if (producto == null) {
			return res.status(400).send({
				status: "error",
				message: "Producto no encontrado",
			});
		}
		return res.status(200).send({
			status: "success",
			message: "Ruta de select un producto",
			producto: producto,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Fallo de consulta general",
		});
	}
};

/*LISTAR  LOS PRODUCTOS DE UN PROVEEDOR
 ********************************************/
const todosPRDPRV = async (req, res) => {
	//Recogemos el proveedor del filtro
	const prov = req.params.proveedor;

	//Hacemos la consulta
	try {
		const todosProv = await modelProducto
			.find({ proveedor: prov })
			.sort({ codigo: "asc" });

		//Obtenemos el total de productos
		let totalProv = await modelProducto.find({ proveedor: prov });

		if (!todosProv) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			message: `Los productos del proveedor:  ${prov} son..`,
			productos: todosProv,
			totalProv: totalProv.length,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/*LISTAR  LOS PRODUCTOS DE UN RESTRINGIDO
 ***********************************************/
const todosPRDRTG = async (req, res) => {
	//Recogemos el proveedor del filtro
	const rtg = req.params.restringido;

	//Averiguamos el tipo de restringido
	if (rtg == "integral") {
		//Hacemos la consulta
		try {
			const todosRest = await modelProducto
				.find({ integral: true })
				.sort({ codigo: "asc" });

			if (!todosRest) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del restringido:  ${rtg} son..`,
				restringidos: todosRest,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (rtg == "sin_azucar") {
		//Hacemos la consulta
		try {
			const todosRest = await modelProducto
				.find({ sin_azucar: true })
				.sort({ codigo: "asc" });

			if (!todosRest) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del restringido:  ${rtg} son..`,
				restringidos: todosRest,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (rtg == "sin_gluten") {
		//Hacemos la consulta
		try {
			const todosRest = await modelProducto
				.find({ sin_gluten: true })
				.sort({ codigo: "asc" });

			if (!todosRest) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del restringido:  ${rtg} son..`,
				restringidos: todosRest,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
};

/**LISTAR  LOS PRODUCTOS DE UN GENERICO
 ********************************************/
const todosPRDGNR = async (req, res) => {
	//Recogemos el generico del filtro
	const gnr = req.params.generico;

	//Hacemos la consulta
	try {
		const todosGNR = await modelProducto
			.find({ generico: gnr })
			.sort({ codigo: "asc" });

		if (!todosGNR) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			message: `Los productos del generico  ${gnr} son..`,
			productos: todosGNR,
			total: todosGNR.length,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/**LISTAR  LOS PRODUCTOS DE UN CONCRETO
 ********************************************/
const todosPRDCRT = async (req, res) => {
	//Recogemos el generico del filtro
	const crt = req.params.concreto;

	//Hacemos la consulta
	try {
		const todosCRT = await modelProducto
			.find({ concreto: crt })
			.sort({ codigo: "asc" });

		if (!todosCRT) {
			return res.status(400).send({
				status: "error",
				message: "Error en la consulta",
			});
		}

		return res.status(200).send({
			status: "success",
			message: `Los productos del concreto  ${crt} son..`,
			productos: todosCRT,
		});
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Error general",
		});
	}
};

/***LISTAR  LOS PRODUCTOS DE UN DIRIGIDO
 ********************************************/
const todosPRDDRG = async (req, res) => {
	//Recogemos el dirigido del filtro
	let drg = req.params.dirigido;

	//Averiguamos el tipo de dirigido
	if (drg == "Alimentacion") {
		//Hacemos la consulta
		try {
			const todosDRG = await modelProducto
				.find({ alimentacion: true })
				.sort({ codigo: "asc" });
			//Obtenemos el total de productos

			if (!todosDRG) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del dirigido  ${drg} son..`,
				productos: todosDRG,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (drg == "Hosteleria") {
		//Hacemos la consulta
		try {
			const todosDRG = await modelProducto
				.find({ hosteleria: true })
				.sort({ codigo: "asc" });

			if (!todosDRG) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del  dirigido  ${drg} son..`,
				productos: todosDRG,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (drg == "Vending") {
		//Hacemos la consulta
		try {
			const todosDRG = await modelProducto
				.find({ vending: true })
				.sort({ codigo: "asc" });

			if (!todosDRG) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del dirigido  ${drg} son..`,
				productos: todosDRG,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
	if (drg == "Ofertas") {
		//Hacemos la consulta
		try {
			const todosDRG = await modelProducto
				.find({ oferta: true })
				.sort({ codigo: "asc" });

			if (!todosDRG) {
				return res.status(400).send({
					status: "error",
					message: "Error en la consulta",
				});
			}

			return res.status(200).send({
				status: "success",
				message: `Los productos del dirigido  ${drg} son..`,
				productos: todosDRG,
			});
		} catch (error) {
			return res.status(400).send({
				status: "error",
				message: "Error general",
			});
		}
	}
};

/********************************************EXPORTAMOS LOS METODOS
 ************************************************************************/
module.exports = {
	nuevoPRD,
	borrarPRD,
	editarPRD,
	selectPRD,
	todosPRD,
	todosPRDPRV,
	todosPRDRTG,
	todosPRDGNR,
	todosPRDCRT,
	todosPRDDRG,
};
