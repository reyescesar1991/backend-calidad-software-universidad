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
exports.RouteRepository = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let RouteRepository = class RouteRepository {
    RouteModel;
    constructor(RouteModel) {
        this.RouteModel = RouteModel;
    }
    async createRoute(data, session) {
        const [newRoute] = await this.RouteModel.create([data], { session });
        return newRoute;
    }
    async findRouteById(idRoute) {
        return await this.RouteModel.findById(idRoute).exec();
    }
    async updateRouteById(idRoute, data, session) {
        return await this.RouteModel.findByIdAndUpdate(idRoute, data, { new: true, runValidators: true }).exec();
    }
    async updateRouteAddSubroute(data, subrouteCreated, session) {
        const updateResult = await this.RouteModel.findOneAndUpdate({ id: data.mainRoute }, { $push: { subroutes: subrouteCreated._id } }, { new: true, useFindAndModify: false });
        console.log(updateResult);
        return updateResult;
    }
    async updateRouteDeleteSubroute(actualRoute, subroute) {
        const updateResultRouteOld = await this.RouteModel.findOneAndUpdate({ id: actualRoute.id }, { $pull: { subroutes: subroute._id } });
        return updateResultRouteOld;
    }
    async deleteRoute(idRoute, session) {
        return await this.RouteModel.findByIdAndUpdate(idRoute, { $set: { active: false } }, { new: true, runValidators: true }).exec();
    }
    async deletePermanentlyRoute(idRoute, session) {
        return await this.RouteModel.findByIdAndDelete(idRoute).exec();
    }
    async activateRoute(idRoute, session) {
        return await this.RouteModel.findByIdAndUpdate(idRoute, { $set: { active: true } }, { new: true, runValidators: true });
    }
    async getSubroutesWithIdRoute(idRoute) {
        const routeWithSubroutes = await this.RouteModel
            .findById(idRoute)
            .populate("subroutes") // Tipo explícito
            .exec();
        return routeWithSubroutes.subroutes;
    }
    async findRouteByCustomId(idRoute) {
        return await this.RouteModel.findOne({ id: idRoute }).exec();
    }
    async searchRoutesByFilters(filter) {
        return await this.RouteModel.find(filter).exec();
    }
    async listRoutes() {
        return await this.RouteModel.find({}).exec();
    }
    /**
     * Obtiene los documentos RouteModel basados en un array de 'id's de rutas principales.
     * Excluye el campo 'subroutes' y otros campos de metadatos.
     * @param mainRouteIds Un array de strings que representan los 'id's de las rutas principales.
     * @returns Una promesa que resuelve a un array de IRoute (objetos planos).
     * Devuelve un array vacío si no se encuentran coincidencias.
     */
    async getRoutesByMainRouteIds(mainRouteIds) {
        try {
            const routes = await this.RouteModel.find({
                id: { $in: mainRouteIds },
                active: true // Asumiendo que solo quieres rutas activas
            })
                // Proyección para incluir solo los campos deseados y excluir los no deseados
                .select('id idModule name path icon active') // Incluye explícitamente los campos que quieres
                // No necesitas excluir __v, createdAt, updatedAt si no están en tu `select`,
                // pero es buena práctica si Mongoose los añade por defecto y no los quieres.
                .lean() // <-- ¡CLAVE! Usa .lean<IRoute[]>() para el tipado correcto
                .exec();
            return routes;
        }
        catch (error) {
            // Es buena práctica manejar errores. Aquí lo relanzamos.
            console.error("Error fetching routes by main route IDs:", error);
            throw error;
        }
    }
};
exports.RouteRepository = RouteRepository;
exports.RouteRepository = RouteRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RouteModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RouteRepository);
//# sourceMappingURL=routeRepository.js.map