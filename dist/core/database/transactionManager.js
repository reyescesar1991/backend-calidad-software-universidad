"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionManager = void 0;
// src/core/database/TransactionManager.ts
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
let TransactionManager = class TransactionManager {
    async startSession() {
        return mongoose_1.default.startSession();
    }
    async executeTransaction(operation) {
        const session = await this.startSession();
        session.startTransaction();
        try {
            const result = await operation(session);
            await session.commitTransaction();
            return result;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async commitTransaction(session) {
        await session.commitTransaction();
    }
    async abortTransaction(session) {
        await session.abortTransaction();
    }
};
exports.TransactionManager = TransactionManager;
exports.TransactionManager = TransactionManager = __decorate([
    (0, tsyringe_1.injectable)()
], TransactionManager);
//# sourceMappingURL=transactionManager.js.map