"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRequestSchemaZod = exports.secondFactorRequestSchemaZod = exports.twoFactorCodeVerificationSchemaZod = exports.dataRecoverPasswordSchemaZod = exports.dataRecoverUsernameSchemaZod = exports.accessDataUserSchemaZod = exports.loginDataSchemaZod = void 0;
const zod_1 = require("zod");
exports.loginDataSchemaZod = zod_1.z.object({
    username: zod_1.z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    password: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
});
exports.accessDataUserSchemaZod = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
exports.dataRecoverUsernameSchemaZod = zod_1.z.object({
    idUser: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
});
exports.dataRecoverPasswordSchemaZod = zod_1.z.object({
    idUser: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    newPassword: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
});
exports.twoFactorCodeVerificationSchemaZod = zod_1.z.object({
    userId: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    code: zod_1.z.string().length(6, "El código debe tener 6 dígitos"),
});
exports.secondFactorRequestSchemaZod = zod_1.z.object({
    userId: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    email: zod_1.z.string().email(),
});
exports.logoutRequestSchemaZod = zod_1.z.object({
    userId: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
});
//# sourceMappingURL=oauth.validation.js.map