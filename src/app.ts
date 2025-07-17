import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './api/routes/oauth/oauth.routes'; // The file path was incorrect in your version


const app = express();


//Middleware base
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Rutas de la API
app.use('/api/v1/auth', authRoutes);




// ¡MUY IMPORTANTE! El middleware de manejo de errores debe ir AL FINAL,
// después de todas tus rutas y otros middlewares.
app.use(errorHandler);

export {app}
