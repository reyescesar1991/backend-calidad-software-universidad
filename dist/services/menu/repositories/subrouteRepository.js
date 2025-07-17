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
exports.SubrouteRepository = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
const timeOutError_1 = require("../../../core/utils/timeOutError");
let SubrouteRepository = class SubrouteRepository {
    subrouteModel;
    constructor(subrouteModel) {
        this.subrouteModel = subrouteModel;
    }
    async createSubroute(data) {
        return this.subrouteModel.create(data);
    }
    async updateSubroute(idSubroute, data) {
        return this.subrouteModel.findByIdAndUpdate(idSubroute, data, { new: true, runValidators: true }).exec();
    }
    async deleteSubroute(idSubroute) {
        return this.subrouteModel.findByIdAndUpdate(idSubroute, { $set: { active: false } }, { new: true, runValidators: true }).exec();
    }
    async findSubrouteById(idSubroute) {
        try {
            return this.subrouteModel.findById(idSubroute).exec();
        }
        catch (error) {
            (0, timeOutError_1.timeOutMongoError)(error);
        }
    }
    async deletePermanentlySubroute(idSubroute, session) {
        return this.subrouteModel.findByIdAndDelete(idSubroute).exec();
    }
    async activeSubroute(idSubroute) {
        return this.subrouteModel.findByIdAndUpdate(idSubroute, { $set: { active: true } }, { new: true, runValidators: true }).exec();
    }
    async getSubroutesByPermission(permissionKey) {
        return this.subrouteModel.findOne({ permissionKey: permissionKey }).exec();
    }
    async searchSubroutesByFilters(filter) {
        console.log(filter);
        return this.subrouteModel.find(filter).exec();
    }
    async listSubroutes() {
        return this.subrouteModel.find({}).exec();
    }
    async searchSubroutesByMainRoute(mainRoute) {
        return this.subrouteModel.find({ mainRoute: mainRoute });
    }
    async findSubrouteByCustomId(customId) {
        return this.subrouteModel.findOne({ id: customId }).exec();
    }
    /**
     * Obtiene los documentos SubrouteDocument que tienen un permissionKey que coincide
     * con alguno de los strings en el array permissionLabels.
     * @param permissionLabels Un array de strings (ej. ['modificar_producto', 'crear_usuario']).
     * @returns Una promesa que resuelve a un array de SubrouteDocument que coinciden.
     * Devuelve un array vacío si no se encuentran coincidencias.
     */
    async getSubroutesByPermissionKeys(permissionLabels) {
        try {
            // Usamos el operador $in para buscar documentos donde 'permissionKey'
            // esté contenido en el array 'permissionLabels'.
            // Añadimos { active: true } para que solo devuelva rutas activas, si eso es lo deseado.
            const subroutes = await this.subrouteModel.find({
                permissionKey: { $in: permissionLabels },
                active: true // Considera si quieres filtrar por activas o no
            }).exec();
            // Si no se encuentran documentos, find() devuelve un array vacío, lo cual es ideal.
            return subroutes;
        }
        catch (error) {
            // Manejo de errores: loguear, envolver, o relanzar.
            // Es crucial propagar el error para que la capa de servicio pueda manejarlo.
            throw error;
        }
    }
};
exports.SubrouteRepository = SubrouteRepository;
exports.SubrouteRepository = SubrouteRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("SubrouteModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SubrouteRepository);
//# sourceMappingURL=subrouteRepository.js.map