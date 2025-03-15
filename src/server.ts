
import {app} from './app';
import { config } from './core/config';
import { logger } from './core/logger';
const connectDb = require("./core/database/index");

const startServer = async () => {

    try {

        connectDb();
        app.listen(config.PORT, () => {
            
            console.log(`Server running on port ${config.PORT}"`);
            
        })

    } catch (error) {
        
    }
}

startServer();

//Manejo de errores no controlados

process.on('uncaughtException', (error) => {

    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
})