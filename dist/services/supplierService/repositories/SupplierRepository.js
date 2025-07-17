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
exports.SupplierRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let SupplierRepositoryImpl = class SupplierRepositoryImpl {
    SupplierModel;
    constructor(SupplierModel) {
        this.SupplierModel = SupplierModel;
    }
    async findSupplierById(idSupplier) {
        return await this.SupplierModel.findById(idSupplier).exec();
    }
    async findSupplierByCustomId(customIdSupplier) {
        return await this.SupplierModel.findOne({ id: customIdSupplier }).exec();
    }
    async createSupplier(dataCreateSupplier, session) {
        const [supplier] = await this.SupplierModel.create([dataCreateSupplier], { session });
        return supplier;
    }
    async updateSupplier(idSupplier, dataUpdateSupplier, session) {
        return await this.SupplierModel.findByIdAndUpdate(idSupplier, dataUpdateSupplier, { new: true, runValidators: true, session }).exec();
    }
    async activateSupplier(idSupplier, session) {
        return await this.SupplierModel.findByIdAndUpdate(idSupplier, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async inactivateSupplier(idSupplier, session) {
        return await this.SupplierModel.findByIdAndUpdate(idSupplier, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async findSuppliersByName(name, isActive) {
        const query = {
            $or: [
                { name: { $regex: name, $options: 'i' } }, // Búsqueda case-insensitive
                { tradeName: { $regex: name, $options: 'i' } }
            ]
        };
        if (typeof isActive === 'boolean') {
            query.isActive = isActive;
        }
        return await this.SupplierModel.find(query).exec();
    }
    async findSuppliersByLocation(city, state, country, isActive) {
        const query = {};
        if (city)
            query.city = city;
        if (state)
            query.state = state;
        if (country)
            query.country = country;
        if (typeof isActive === 'boolean')
            query.isActive = isActive;
        return await this.SupplierModel.find(query).exec();
    }
    async findAllSuppliers(isActive) {
        const query = {};
        if (typeof isActive === 'boolean') {
            query.isActive = isActive;
        }
        return await this.SupplierModel.find(query).exec();
    }
    async findSuppliersByPaymentTerm(paymentTermId, isActive) {
        const query = { paymentTerm: paymentTermId };
        if (typeof isActive === 'boolean') {
            query.isActive = isActive;
        }
        return await this.SupplierModel.find(query).exec();
    }
    async existsByContactInfo(email, phoneNumber, taxId, name, tradeName, contactPerson, businessRegistrationNumber, excludeId) {
        const query = { $or: [] };
        if (email)
            query.$or.push({ email });
        if (phoneNumber)
            query.$or.push({ phoneNumber });
        if (taxId)
            query.$or.push({ taxId });
        if (name)
            query.$or.push({ name });
        if (tradeName)
            query.$or.push({ tradeName });
        if (contactPerson)
            query.$or.push({ contactPerson });
        if (businessRegistrationNumber)
            query.$or.push({ businessRegistrationNumber });
        if (query.$or.length === 0)
            return false;
        if (excludeId) {
            // Para excluir el documento actual durante una actualización
            query._id = { $ne: excludeId };
        }
        const count = await this.SupplierModel.countDocuments(query).exec();
        return count > 0;
    }
};
exports.SupplierRepositoryImpl = SupplierRepositoryImpl;
exports.SupplierRepositoryImpl = SupplierRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("SupplierModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SupplierRepositoryImpl);
//# sourceMappingURL=SupplierRepository.js.map