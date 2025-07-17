"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMongoIdsToString = void 0;
const mongoose_1 = require("mongoose");
const convertMongoIdsToString = (ids) => {
    const converter = (id) => {
        if (typeof id === 'string')
            return id;
        if (id instanceof mongoose_1.Types.ObjectId)
            return id.toString();
        return String(id);
    };
    return Array.isArray(ids)
        ? ids.map(converter)
        : converter(ids);
};
exports.convertMongoIdsToString = convertMongoIdsToString;
//# sourceMappingURL=generals.helper.js.map