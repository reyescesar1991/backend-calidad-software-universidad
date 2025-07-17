"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorService = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../../core/exceptions");
const validators_1 = require("../../../core/validators");
const transactionManager_1 = require("../../../core/database/transactionManager");
const transaccional_wrapper_1 = require("../../../core/utils/transaccional-wrapper");
let TwoFactorService = class TwoFactorService {
    twoFactorDataRepository;
    transactionManager;
    twoFactorDataValidator;
    constructor(twoFactorDataRepository, transactionManager, twoFactorDataValidator) {
        this.twoFactorDataRepository = twoFactorDataRepository;
        this.transactionManager = transactionManager;
        this.twoFactorDataValidator = twoFactorDataValidator;
    }
    async getFactorsAvailable() {
        try {
            const twoFactorData = await this.twoFactorDataRepository.getFactorsAvailable();
            validators_1.TwoFactorDataValidator.validateTwoFactorDataBase(twoFactorData);
            return twoFactorData;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findFactorById(factorId) {
        try {
            const factor = await this.twoFactorDataRepository.findFactorById(factorId);
            validators_1.TwoFactorDataValidator.validateFactorExists(factor);
            return factor;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findFactorByMethod(methodFactor) {
        try {
            const factor = await this.twoFactorDataRepository.findFactorByMethod(methodFactor);
            validators_1.TwoFactorDataValidator.validateFactorExistsByMethod(factor);
            return factor;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async addFactor(dataFactor, sessionParam) {
        try {
            console.log(dataFactor);
            await this.twoFactorDataValidator.validateFactorUniquenessByMethod(dataFactor.method);
            validators_1.TwoFactorDataValidator.validateNewFactorQuantity(dataFactor.quantityUsers);
            return await this.twoFactorDataRepository.addFactor(dataFactor, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateFactor(factorId, dataFactor) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const factor = await this.twoFactorDataRepository.findFactorById(factorId);
                validators_1.TwoFactorDataValidator.validateFactorExists(factor);
                await this.twoFactorDataValidator.validateFactorUniquenessByMethod(dataFactor.method);
                return await this.twoFactorDataRepository.updateFactor(factorId, dataFactor, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async enableFactor(factorId) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const factor = await this.twoFactorDataRepository.findFactorById(factorId);
                validators_1.TwoFactorDataValidator.validateFactorExists(factor);
                validators_1.TwoFactorDataValidator.validateFactorAlreadyEnable(factor);
                return await this.twoFactorDataRepository.enableFactor(factorId, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async disableFactor(factorId) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const factor = await this.twoFactorDataRepository.findFactorById(factorId);
                validators_1.TwoFactorDataValidator.validateFactorExists(factor);
                validators_1.TwoFactorDataValidator.validateFactorAlreadyDisable(factor);
                return await this.twoFactorDataRepository.disableFactor(factorId, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async addUserQuantity(factorId) {
        console.log(factorId);
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const factor = await this.twoFactorDataRepository.findFactorById(factorId);
                validators_1.TwoFactorDataValidator.validateFactorExists(factor);
                return await this.twoFactorDataRepository.addUserQuantity(factorId, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
};
exports.TwoFactorService = TwoFactorService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorService.prototype, "addFactor", null);
exports.TwoFactorService = TwoFactorService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ITwoFactorDataRepository")),
    __param(1, (0, tsyringe_1.inject)("TransactionManager")),
    __param(2, (0, tsyringe_1.inject)("TwoFactorDataValidator")),
    __metadata("design:paramtypes", [Object, transactionManager_1.TransactionManager,
        validators_1.TwoFactorDataValidator])
], TwoFactorService);
//# sourceMappingURL=TwoFactor.service.js.map