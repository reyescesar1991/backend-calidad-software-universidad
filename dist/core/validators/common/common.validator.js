"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonValidator = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const exceptions_1 = require("../../exceptions");
class CommonValidator {
    static validateObjectId(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new exceptions_1.BadFormatMongoIDError();
        }
    }
}
exports.CommonValidator = CommonValidator;
//# sourceMappingURL=common.validator.js.map