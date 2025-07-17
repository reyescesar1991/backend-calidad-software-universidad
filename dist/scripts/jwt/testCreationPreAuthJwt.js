"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesJwt/dependencies");
const oauthService_1 = require("../../services/oauthService");
const jwt_util_1 = require("../../core/utils/jwt.util");
const createPreAuthJwt = async () => {
    try {
        await (0, dependencies_1.configureJwtDependencies)();
        const jwtService = tsyringe_1.container.resolve(oauthService_1.TokenService);
        // Solo pasar los datos básicos (sin exp/lat)
        const token = jwtService.generatePreAuthToken("username", "USER9999");
        console.log("📄 Token Pre-Auth creado:", token);
        const decodedToken = jwtService.verifyPreAuthToken(token);
        console.log("📄 Token Pre-Auth decodificado:", decodedToken);
        console.log("Token Pre-Auth valido: ", jwt_util_1.JwtValidator.isValidPreAuth(decodedToken));
        return token;
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};
createPreAuthJwt().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreationPreAuthJwt.js.map