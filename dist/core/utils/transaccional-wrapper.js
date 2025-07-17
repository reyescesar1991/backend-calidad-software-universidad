"use strict";
// src/common/decorators/transactional.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = Transactional;
function Transactional() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            // Log para saber que el decorador se ha activado
            console.log(`[Transactional] ==> Entrando al decorador para el método '${propertyKey}'.`);
            const serviceInstance = this;
            const transactionManager = serviceInstance.transactionManager;
            if (!transactionManager) {
                throw new Error(`La clase ${target.constructor.name} usa @Transactional pero no tiene una propiedad 'transactionManager'.`);
            }
            const existingSession = args.find((arg) => arg && arg.constructor.name === 'ClientSession');
            if (existingSession) {
                // Log si encuentra una sesión
                console.log(`[Transactional]     - Detectada sesión existente. Uniéndose a la transacción.`);
                return originalMethod.apply(this, args);
            }
            else {
                // Log si NO encuentra una sesión
                console.log(`[Transactional]     - No se encontró sesión. Creando una nueva transacción.`);
                return transactionManager.executeTransaction(async (newSession) => {
                    console.log(`[Transactional]     - Nueva transacción iniciada con éxito.`);
                    const sessionParamIndex = originalMethod.length - 1;
                    args[sessionParamIndex] = newSession;
                    return originalMethod.apply(this, args);
                });
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=transaccional-wrapper.js.map