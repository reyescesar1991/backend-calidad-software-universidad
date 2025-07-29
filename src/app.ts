import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './api/routes/oauth/oauth.routes';
import userDataRoutes from './api/routes/userData/userData.routes';
import roleConfigRoutes from './api/routes/roleConfig/roleConfig.routes';
import locationRoutes from './api/routes/location/location.routes';
import menuRoutes from './api/routes/menu/menu.routes';
import userRoutes from './api/routes/user/user.routes';


const app = express();

// --- Middlewares de Seguridad y CORS ---

// 1. Helmet: Ayuda a proteger tu aplicación de algunas vulnerabilidades web conocidas
// estableciendo varias cabeceras HTTP de seguridad. Es una buena práctica usarlo siempre.
app.use(helmet());

// 2. CORS: Cross-Origin Resource Sharing. Esencial para permitir que tu frontend
// (ej. en http://localhost:4205) se comunique con tu backend (ej. en http://localhost:3001).
const allowedOrigins = [
    'http://localhost:4205',
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Permite solicitudes sin 'origin' (como las de Postman, apps móviles o cURL)
        // y las que vienen de los orígenes en nuestra lista blanca.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por la política de CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP que permites
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras que permites en las peticiones
};

app.use(cors(corsOptions));
//Middleware base
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Rutas de la API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/userData', userDataRoutes);
app.use('/api/v1/roleConfig', roleConfigRoutes),
app.use('/api/v1/location', locationRoutes),
app.use('/api/v1/menu', menuRoutes),
app.use('/api/v1/user', userRoutes),



// ¡MUY IMPORTANTE! El middleware de manejo de errores debe ir AL FINAL,
// después de todas tus rutas y otros middlewares.
app.use(errorHandler);

export {app}
