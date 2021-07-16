const express = require('express');
require('dotenv').config();

const cors = require('cors');

let paths = require('path');

// rutas del servidor
paths = {
   auth: `/api/${process.env.API_VERSION}/auth`,
   usuarios: `/api/${process.env.API_VERSION}/usuarios`,
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

// Rutas
app.use(paths.usuarios, require('./routers/users'));
// app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
