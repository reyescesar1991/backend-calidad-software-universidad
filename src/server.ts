
import {app} from './app';
import { config } from './core/config';
import { logger } from './core/logger';
import "reflect-metadata"; // 👈 Primera línea
import { container } from 'tsyringe';
import { runAllDependencies } from "./core/config/configureAllDependencies"; // Importa las dependencias
import { OAuthService } from './services/oauthService/OAuth.service';
const connectDb = require("./core/database/index");

const startServer = async () => {

    try {
        await runAllDependencies();

        // --- Verificación de Dependencias ---
        logger.info('Verificando la resolución de dependencias clave...');
        container.resolve(OAuthService); // Intenta resolver un servicio crítico.
        logger.info('🚀 Verificación de dependencias exitosa. El contenedor está listo.');
        // ---------------------------------

        connectDb();
        app.listen(config.PORT, () => {

            console.log(`Server running on port ${config.PORT}"`);

        })

    } catch (error) {
        logger.error('❌ Fallo critico durante el arranque del servidor:', error);
        process.exit(1);
    }
}

startServer();
process.on('uncaughtException', (error) => {

    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});
