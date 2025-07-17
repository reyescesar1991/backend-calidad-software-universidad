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
exports.ModuleRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let ModuleRepositoryImpl = class ModuleRepositoryImpl {
    ModuleModel;
    constructor(ModuleModel) {
        this.ModuleModel = ModuleModel;
    }
    async findModuleById(idModule) {
        return await this.ModuleModel.findById(idModule).exec();
    }
    async findModuleByCustomId(customIdModule) {
        return await this.ModuleModel.findOne({ id: customIdModule }).exec();
    }
    async searchModuleByFilter(filter) {
        return await this.ModuleModel.find(filter).exec();
    }
    async createModule(data, session) {
        return await this.ModuleModel.create(data);
    }
    async updateModule(idModule, data, session) {
        return await this.ModuleModel.findByIdAndUpdate(idModule, data, { new: true, runValidators: true });
    }
    async activateModule(idModule, session) {
        return await this.ModuleModel.findByIdAndUpdate(idModule, { $set: { active: true } }, { new: true, runValidators: true }).exec();
    }
    async deleteModule(idModule, session) {
        return await this.ModuleModel.findByIdAndUpdate(idModule, { $set: { active: false } }, { new: true, runValidators: true }).exec();
    }
    async getRoutesByModule(idModule) {
        const routeWithSubroutes = await this.ModuleModel
            .findById(idModule)
            .populate("routes") // Tipo explícito
            .exec();
        return routeWithSubroutes.routes;
    }
    async updateModuleAddRoute(dataRoute, routeCreated, session) {
        const module = await this.ModuleModel.findOneAndUpdate({ id: dataRoute.idModule, }, { $push: { routes: routeCreated._id } }, { new: true, useFindAndModify: true }).exec();
        return module;
    }
    async updateModuleDeleteRoute(actualModule, route, session) {
        const module = await this.ModuleModel.findOneAndUpdate({ id: actualModule.id }, { $pull: { routes: route._id } }, { new: true, useFindAndModify: true }).exec();
        return module;
    }
    /**
     * Obtiene los documentos RouteModel basados en un array de 'id's de rutas principales.
     * Excluye el campo 'subroutes' y otros campos de metadatos.
     * @param mainRouteIds Un array de strings que representan los 'id's de las rutas principales.
     * @returns Una promesa que resuelve a un array de IRoute (objetos planos).
     * Devuelve un array vacío si no se encuentran coincidencias.
     */
    async getModulesByMainModuleIds(modulesIds) {
        try {
            const modules = await this.ModuleModel.find({
                id: { $in: modulesIds },
            })
                // Proyección para incluir solo los campos deseados y excluir los no deseados
                .select('id title') // Incluye explícitamente los campos que quieres
                // No necesitas excluir __v, createdAt, updatedAt si no están en tu `select`,
                // pero es buena práctica si Mongoose los añade por defecto y no los quieres.
                .lean() // <-- ¡CLAVE! Usa .lean<IRoute[]>() para el tipado correcto
                .exec();
            return modules;
        }
        catch (error) {
            // Es buena práctica manejar errores. Aquí lo relanzamos.
            console.error("Error fetching routes by main route IDs:", error);
            throw error;
        }
    }
};
exports.ModuleRepositoryImpl = ModuleRepositoryImpl;
exports.ModuleRepositoryImpl = ModuleRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ModuleModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ModuleRepositoryImpl);
//# sourceMappingURL=moduleRepository.js.map