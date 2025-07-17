"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesJwt/dependencies");
const oauthService_1 = require("../../services/oauthService");
const jwt_util_1 = require("../../core/utils/jwt.util");
const createJwt = async () => {
    try {
        await (0, dependencies_1.configureJwtDependencies)();
        const jwtService = tsyringe_1.container.resolve(oauthService_1.TokenService);
        // Solo pasar los datos básicos (sin exp/lat)
        const token = jwtService.generateToken({
            userId: 'USER9999',
            jti: "",
        });
        console.log("📄 Token creado:", token);
        const decodedToken = jwtService.verifyToken(token);
        console.log("📄 Token decodificado:", decodedToken);
        console.log("Token tiene rol: ", jwt_util_1.JwtValidator.hasRole(decodedToken));
        console.log("Token valido: ", jwt_util_1.JwtValidator.isValid(decodedToken));
        console.log("Token tiempo: ", jwt_util_1.JwtValidator.getRemainingTime(decodedToken));
        console.log("Token tiene rol administrador: ", jwt_util_1.JwtValidator.hasMinimumRole(decodedToken, '04'));
        console.log("Token tiene rol por defecto: ", jwt_util_1.JwtValidator.getRoleOrDefault(decodedToken));
        return token;
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};
createJwt().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreationJwt.js.map