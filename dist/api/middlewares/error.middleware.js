"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var logger_1 = require("../../core/logger");
var errorHandler = function (err, req, res, next) {
    logger_1.logger.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map