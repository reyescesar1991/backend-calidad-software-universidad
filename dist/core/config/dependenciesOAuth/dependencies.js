"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOAuthDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const OAuth_service_1 = require("../../../services/oauthService/OAuth.service");
const configureOAuthDependencies = async () => {
    tsyringe_1.container.register("OAuthService", { useClass: OAuth_service_1.OAuthService });
};
exports.configureOAuthDependencies = configureOAuthDependencies;
//# sourceMappingURL=dependencies.js.map