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
exports.IHeadquarterRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let IHeadquarterRepositoryImpl = class IHeadquarterRepositoryImpl {
    HeadquarterModel;
    constructor(HeadquarterModel) {
        this.HeadquarterModel = HeadquarterModel;
    }
    async findHeadquarterById(idHeadquarter) {
        return await this.HeadquarterModel.findById(idHeadquarter).exec();
    }
    async findHeadquarterByCustomId(customIdHeadquarter) {
        return await this.HeadquarterModel.findOne({ idHeadquarter: customIdHeadquarter }).exec();
    }
    async searchHeadquarterByFilter(filter) {
        const query = {};
        Object.entries(filter).forEach(([key, value]) => {
            if (key === "geoLocation" && typeof value === "object") {
                // Convertir objeto geoLocation en claves anidadas
                Object.entries(value).forEach(([subKey, subValue]) => {
                    query[`geoLocation.${subKey}`] = subValue;
                });
            }
            else {
                query[key] = value;
            }
        });
        return this.HeadquarterModel.find(query).exec();
    }
    async searchHeadquarterByFilterWithOr(filter) {
        const orConditions = Object.entries(filter).map(([key, value]) => ({
            [key]: value
        }));
        // Si no hay condiciones, retornar array vacío
        if (orConditions.length === 0)
            return [];
        return await this.HeadquarterModel.find({
            $or: orConditions
        }).exec();
    }
    async listHeadquarter() {
        return await this.HeadquarterModel.find({}).exec();
    }
    async activateHeadquarter(idHeadquarter, session) {
        return await this.HeadquarterModel.findByIdAndUpdate(idHeadquarter, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async desactivateHeadquarter(idHeadquarter, session) {
        return await this.HeadquarterModel.findByIdAndUpdate(idHeadquarter, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async createHeadquarter(dataHeadquarter, session) {
        const [headquarter] = await this.HeadquarterModel.create([dataHeadquarter], { session });
        return headquarter;
    }
    async updateHeadquarter(idHeadquarter, dataUpdateHeadquarter, session) {
        return await this.HeadquarterModel.findByIdAndUpdate(idHeadquarter, dataUpdateHeadquarter, { new: true, runValidators: true, session }).exec();
    }
};
exports.IHeadquarterRepositoryImpl = IHeadquarterRepositoryImpl;
exports.IHeadquarterRepositoryImpl = IHeadquarterRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("HeadquartersModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], IHeadquarterRepositoryImpl);
//# sourceMappingURL=headquarterRepository.js.map