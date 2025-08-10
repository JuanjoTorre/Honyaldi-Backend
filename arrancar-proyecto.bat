::ARCHIVO QUE VA A EJECUTAR TODO LO NECESARIO PARA INICIAR EL PROYECTO

::ARRANCAR EL DEMONIO DE MONGODB
::Arranco un cmd (cmd.exe)
::Y le indico que le voy a pasar un parametro (/k)
::Voy a la carpeta donde esta el mongod.exe(cd C:\Program Files\MongoDB\Server\4.4\bin)
::Le indico que le voy a pasar otro parametro &&
::Arranco el mongod.exe (mongod.exe)
::y le indico donde guardo las bases de datos(--dbpath C:\data\db)
start cmd.exe /k "cd C:\Program Files\MongoDB\Server\7.0\bin && mongod.exe --dbpath C:\data\db"

::ARRANCAR EL PROYECTO DE EXPRESS (BACKEND)
::Arranco un cmd (cmd.exe)
::Y le indico que le voy a pasar un parametro (/k)
::Voy a la carpeta donde esta el proyecto de backend(cd C:\wamp64\www\PROYECTOS\ProyectoHonyaldi\BACKEND)
::Le indico que le voy a pasar otro parametro (&&)
::Arranco el proyecto de Express (npm start)
start cmd.exe /k "cd C:\Users\Usuario\OneDrive\Documents\Escritorio\Programas\PROYECTOS\Honyaldi-Backend && npm start"

::ARRANCAR EL PROYECTO DE VITE (FRONTEND)
::Arranco un cmd (cmd.exe)
::Y le indico que le voy a pasar un parametro (/k)
::Voy a la carpeta donde esta el proyecto de frontend(cd C:\wamp64\www\PROYECTOS\ProyectoHonyaldi\FRONTEND)
::Le indico que le voy a pasar otro parametro (&&)
::Arranco el proyecto de Vite/React (npm run dev)
start cmd.exe /k "cd C:\Users\Usuario\OneDrive\Documents\Escritorio\Programas\PROYECTOS\honyaldi && npm run dev"


::ARRANCO EL POSTMAN Y EL MONGODBCOMPASS
start C:\Users\Usuario\AppData\Local\Postman\Postman.exe
start C:\Users\Usuario\AppData\Local\MongoDBCompass\MongoDBCompass.exe
