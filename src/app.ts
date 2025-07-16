import express from 'express';
import { errorHandler } from './middlewares/error.middleware';


const app = express();

console.log(`Server running on port ${app}"`);

//Middleware base
app.use(express.json());
app.use(express.urlencoded({extend : true}));






// ¡MUY IMPORTANTE! El middleware de manejo de errores debe ir AL FINAL,
// después de todas tus rutas y otros middlewares.
app.use(errorHandler);

export {app}
