/*********************************************ENTRADA A LA APLICACION
 * ********************************************************************* */

/**************************************IMPORTAR DEPENDENCIAS
 ****************************************************************/
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

/***************************************MENSAJE DE BIENVENIDA
 ****************************************************************/
console.log("API NODE para HONYALDI arrancada ");

/****************CREAMOS Y CONFIGURAMOS EL SERVIDOR DE NODE
 ******************************************************************/
const app = express();

/*********************************************CONEXION A LA BBDD
 ******************************************************************/
dbConnection();

/**************************************************************CORS
 ******************************************************************/
//El cors sirve para restringir determinadas rutas a determinados dominios
app.use(cors());

/************CONVERTIMOS LOS DATOS DEL BODY A OBJETOS JSON
 ******************************************************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/******************************DEFINIMOS EL DIRECTORIO PUBLICO
 ******************************************************************/
app.use(express.static("public"));

/************CARGAMOS LAS RUTAS EN EXPRESS CON EL PREFIJO API
 ******************************************************************/
app.use("/api/user", require("./routes/routesUser"));
app.use("/api/concreto", require("./routes/routesConcreto"));
app.use("/api/dirigido", require("./routes/routesDirigido"));
app.use("/api/generico", require("./routes/routesGenerico"));
app.use("/api/restringido", require("./routes/routesRestringido"));
app.use("/api/proveedor", require("./routes/routesProveedor"));
app.use("/api/producto", require("./routes/routesProducto"));

/********PONEMOS EL SERVIDOR A ESCUCHAR LAS PETICIONES HTTP
 ******************************************************************/
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
