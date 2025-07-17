"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDateToJwt = void 0;
const configureDateToJwt = (expToken) => {
    // 3.1. Toma el valor del timestamp (en segundos)
    const expirationTimestampInSeconds = expToken;
    // 3.2. Multiplícalo por 1000 para convertirlo a milisegundos
    const expirationTimestampInMilliseconds = expirationTimestampInSeconds * 1000;
    // 3.3 Crea un objeto Date de JavaScript con los milisegundos
    return new Date(expirationTimestampInMilliseconds);
};
exports.configureDateToJwt = configureDateToJwt;
//# sourceMappingURL=jwt.helper.js.map