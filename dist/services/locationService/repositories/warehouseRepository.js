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
exports.WarehouseRepositoryImpl = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let WarehouseRepositoryImpl = class WarehouseRepositoryImpl {
    WarehouseModel;
    constructor(WarehouseModel) {
        this.WarehouseModel = WarehouseModel;
    }
    async findWarehouseById(idWarehouse) {
        return await this.WarehouseModel.findById(idWarehouse).exec();
    }
    async findWarehouseByCustomId(idWarehouse) {
        return await this.WarehouseModel.findOne({ idWarehouse: idWarehouse }).exec();
    }
    async createWarehouse(dataWarehouse, session) {
        const [newWarehouse] = await this.WarehouseModel.create([dataWarehouse], { session });
        return newWarehouse;
    }
    async updateWarehouse(idWarehouse, dataUpdateWarehouse, session) {
        return await this.WarehouseModel.findByIdAndUpdate(idWarehouse, dataUpdateWarehouse, { new: true, runValidators: true, session }).exec();
    }
    async inactivateWarehouse(idWarehouse, session) {
        return await this.WarehouseModel.findByIdAndUpdate(idWarehouse, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async activateWarehouse(idWarehouse, session) {
        return await this.WarehouseModel.findByIdAndUpdate(idWarehouse, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async findAllWarehouses() {
        return await this.WarehouseModel.find({}).exec();
    }
    async getCapacityWarehouse(idWarehouse) {
        const warehouse = await this.WarehouseModel.findOne({
            _id: idWarehouse,
            isActive: true
        })
            // Proyección para incluir solo los campos deseados y excluir los no deseados
            .select('capacity') // Incluye explícitamente los campos que quieres
            .lean()
            .exec();
        if (warehouse && typeof warehouse.capacity === 'number') {
            return warehouse.capacity;
        }
        else {
            return null; // O el valor predeterminado que consideres apropiado
        }
    }
    async updateCapacityWarehousePerPallet(idWarehouse, newCapacityPallet, session) {
        return await this.WarehouseModel.findByIdAndUpdate(idWarehouse, { $set: { capacity: newCapacityPallet } }, { new: true, runValidators: true, session }).exec();
    }
    async getCurrentCapacityWarehouse(idWarehouse) {
        const warehouse = await this.WarehouseModel.findOne({ _id: idWarehouse, isActive: true })
            .select('currentCapacity')
            .lean()
            .exec();
        if (warehouse && typeof warehouse.currentCapacity === 'number') {
            return warehouse.currentCapacity;
        }
        else {
            return null; // O el valor predeterminado que consideres apropiado
        }
    }
    /**
         * Incrementa la capacidad actual de un almacén por un número de cajas.
         * Calcula el incremento total basado en unitsPerBox del almacén.
         * @param idWarehouse El _id del almacén.
         * @param addBoxes El número de cajas a añadir.
         * @param session (Opcional) La sesión de cliente para transacciones.
         * @returns El documento de almacén actualizado o null si no se encuentra o no está activo.
         */
    async addCurrentCapacityWarehousePerBox(idWarehouse, addBoxes, session) {
        // Calcular el incremento total en unidades
        const unitsToAdd = addBoxes;
        // Paso 2: Usar findOneAndUpdate con $inc para actualizar la capacidad actual
        const updatedWarehouse = await this.WarehouseModel.findOneAndUpdate({ _id: idWarehouse, isActive: true }, // Criterio de búsqueda
        { $inc: { currentCapacity: unitsToAdd } }, // Operador $inc
        {
            new: true, // Devuelve el documento modificado
            runValidators: true, // Ejecuta los validadores definidos en el esquema
            session: session // Pasa la sesión si está disponible
        }).exec();
        return updatedWarehouse;
    }
    async decreaseCurrentCapacityWarehousePerBox(idWarehouse, decreaseBoxes, session) {
        const updatedWarehouse = await this.WarehouseModel.findOneAndUpdate({ _id: idWarehouse, isActive: true }, // Criterio de búsqueda
        // Simplemente decrementa currentCapacity por removeBoxes
        { $inc: { currentCapacity: -decreaseBoxes } }, {
            new: true, // Devuelve el documento modificado
            runValidators: true, // Ejecuta los validadores definidos en el esquema (útil si tienes validación de min/max)
            session: session // Pasa la sesión si está disponible
        }).exec();
        return updatedWarehouse;
    }
};
exports.WarehouseRepositoryImpl = WarehouseRepositoryImpl;
exports.WarehouseRepositoryImpl = WarehouseRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("WarehouseModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], WarehouseRepositoryImpl);
//# sourceMappingURL=warehouseRepository.js.map