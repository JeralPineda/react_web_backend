const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const cors = require('cors');

let paths = require('path');

// rutas del servidor
paths = {
   auth: `/api/${process.env.API_VERSION}/auth`,
   user: `/api/${process.env.API_VERSION}/user`,
   menu: `/api/${process.env.API_VERSION}/menu`,
   newsletter: `/api/${process.env.API_VERSION}/newsletter`,
   courses: `/api/${process.env.API_VERSION}/courses`,
   post: `/api/${process.env.API_VERSION}/post`,
};

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

//   Fileupload - Carga de archivos
app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true, //crea el directorio si no existe
   })
);

// Rutas
app.use(paths.auth, require('./routers/auth'));
app.use(paths.user, require('./routers/user'));
app.use(paths.menu, require('./routers/menu'));
app.use(paths.newsletter, require('./routers/newsletter'));
app.use(paths.courses, require('./routers/courses'));
app.use(paths.post, require('./routers/post'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
