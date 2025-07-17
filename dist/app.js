"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
exports.app = app;
console.log(`Server running on port ${app}"`);
//Middleware base
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extend: true }));
// ¡MUY IMPORTANTE! El middleware de manejo de errores debe ir AL FINAL,
// después de todas tus rutas y otros middlewares.
app.use(error_middleware_1.errorHandler);
//# sourceMappingURL=app.js.map