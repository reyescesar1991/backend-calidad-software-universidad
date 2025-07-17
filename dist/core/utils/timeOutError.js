"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeOutMongoError = void 0;
const mongodb_1 = require("mongodb");
const exceptions_1 = require("../exceptions");
const timeOutMongoError = async (error) => {
    if (error instanceof mongodb_1.MongoServerError && error.name === "MongoServerSelectionError") {
        throw new exceptions_1.DatabaseConnectionError();
    }
};
exports.timeOutMongoError = timeOutMongoError;
//# sourceMappingURL=timeOutError.js.map