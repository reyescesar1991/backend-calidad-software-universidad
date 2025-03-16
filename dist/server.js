"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./core/config");
const logger_1 = require("./core/logger");
const connectDb = require("./core/database/index");
const startServer = async () => {
    try {
        connectDb();
        app_1.app.listen(config_1.config.PORT, () => {
            console.log(`Server running on port ${config_1.config.PORT}"`);
        });
    }
    catch (error) {
    }
};
startServer();
//Manejo de errores no controlados
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});
//# sourceMappingURL=server.js.map