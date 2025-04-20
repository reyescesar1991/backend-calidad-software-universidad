import { inject, injectable } from "tsyringe";
import { ISubrouteRepository } from "../interfaces/ISubroutesRepository";
import { FilterOptions, SubrouteFilterKeys } from "../../../core/types";
import { SubrouteDocument } from "../../../db/models";
import { SubrouteDto, ObjectIdParam, SubrouteUpdateDto } from "../../../validations";
import { Model } from "mongoose";

@injectable()
export class SubrouteRepository implements ISubrouteRepository{


    constructor(@inject("SubrouteModel") private readonly subrouteModel : Model<SubrouteDocument>){}

    async createSubroute(data: SubrouteDto): Promise<SubrouteDocument> {
        
        return this.subrouteModel.create(data);

    }
    async updateSubroute(idSubroute: ObjectIdParam, data: SubrouteUpdateDto): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndUpdate(
            idSubroute,
            data,
            {new : true, runValidators: true},
        ).exec();

    }
    async deleteSubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndUpdate(
            idSubroute,
            {$set : {active : false}},
            { new: true, runValidators: true }
        ).exec();
    }
    async findSubrouteById(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findById(idSubroute).exec();
    }
    async deletePermanentlySubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndDelete(idSubroute).exec();
    }
    async activeSubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndUpdate(
            idSubroute,
            {$set : {active: true}},
            {new: true, runValidators: true},
        ).exec();
    }
    async getSubroutesByPermission(permissionKey: string): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findOne({permissionKey : permissionKey}).exec();
    }
    async searchSubroutesByFilters(filter: FilterOptions<SubrouteFilterKeys>): Promise<SubrouteDocument[]> {
        
        return this.subrouteModel.find(filter).exec();
    }

    async listSubroutes(): Promise<SubrouteDocument[] | null> {
        return this.subrouteModel.find({}).exec();
    }

    async searchSubroutesByMainRoute(mainRoute: string): Promise<SubrouteDocument[] | null> {
        return this.subrouteModel.findById({mainRoute: mainRoute})
    }

    async findByCustomId(customId: string): Promise<SubrouteDocument | null> {
        return this.subrouteModel.findOne({ id: customId }).exec();
    }
}