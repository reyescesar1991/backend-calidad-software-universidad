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
exports.IDepartmentRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let IDepartmentRepositoryImpl = class IDepartmentRepositoryImpl {
    DepartmentModel;
    constructor(DepartmentModel) {
        this.DepartmentModel = DepartmentModel;
    }
    async findDepartmentById(idDepartment) {
        return await this.DepartmentModel.findById(idDepartment).exec();
    }
    async findDepartmentByCustomId(customIdDepartment) {
        return await this.DepartmentModel.findOne({ idDepartment: customIdDepartment }).exec();
    }
    async findDepartmentsByHeadquarter(idHeadquarter) {
        return await this.DepartmentModel.find({ headquartersId: idHeadquarter }).exec();
    }
    async searchDepartmentByFilter(filter) {
        return await this.DepartmentModel.find(filter).exec();
    }
    async listDepartment() {
        return await this.DepartmentModel.find({}).exec();
    }
    async activateDepartment(idDepartment, session) {
        return await this.DepartmentModel.findOneAndUpdate(idDepartment, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async desactivateDepartment(idDepartment, session) {
        return await this.DepartmentModel.findOneAndUpdate(idDepartment, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async createDepartment(dataDepartment, session) {
        const [department] = await this.DepartmentModel.create([dataDepartment], { session });
        return department;
    }
    async updateDepartment(idDepartment, dataUpdateDepartment, session) {
        return await this.DepartmentModel.findByIdAndUpdate(idDepartment, dataUpdateDepartment, { new: true, runValidators: true, session }).exec();
    }
    async searchDepartmentByFilterWithOr(filter) {
        const orConditions = Object.entries(filter).map(([key, value]) => ({
            [key]: value
        }));
        // Si no hay condiciones, retornar array vacío
        if (orConditions.length === 0)
            return [];
        return await this.DepartmentModel.find({
            $or: orConditions
        }).exec();
    }
};
exports.IDepartmentRepositoryImpl = IDepartmentRepositoryImpl;
exports.IDepartmentRepositoryImpl = IDepartmentRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("DepartmentModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], IDepartmentRepositoryImpl);
//# sourceMappingURL=departmentRepository.js.map