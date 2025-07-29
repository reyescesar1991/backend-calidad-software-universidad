import { inject, injectable } from "tsyringe";
import { IDepartmentRepository } from "../interfaces/IDepartmentRepository";
import { ClientSession, Model } from "mongoose";
import { DepartmentDocument } from "../../../db/models";
import { FilterOptions, DepartmentConfigFilterKeys } from "../../../core/types";
import { ObjectIdParam, DepartmentDto, UpdateDepartmentDto } from "../../../validations";


@injectable()
export class IDepartmentRepositoryImpl implements IDepartmentRepository{

    constructor(@inject("DepartmentModel") private readonly DepartmentModel : Model<DepartmentDocument>){}

    async findDepartmentById(idDepartment: ObjectIdParam): Promise<DepartmentDocument | null> {
        
        return await this.DepartmentModel.findById(idDepartment).exec();
    }

    async findDepartmentByCustomId(customIdDepartment: string): Promise<DepartmentDocument | null> {
        
        return await this.DepartmentModel.findOne({idDepartment : customIdDepartment}).exec();
    }

    async findDepartmentsByHeadquarter(idHeadquarter: ObjectIdParam): Promise<DepartmentDocument[] | null> {
        
        return await this.DepartmentModel.find({headquartersId : idHeadquarter, isActive: true})
        .select("_id idDepartment name label description")
        .exec();
    } 

    async searchDepartmentByFilter(filter: FilterOptions<DepartmentConfigFilterKeys>): Promise<DepartmentDocument[] | null> {
        
        return await this.DepartmentModel.find(filter).exec();
    }

    async listDepartment(): Promise<DepartmentDocument[] | null> {
        
        return await this.DepartmentModel.find({}).exec();
    }

    async activateDepartment(idDepartment: ObjectIdParam, session?: ClientSession): Promise<DepartmentDocument | null> {
        
        return await this.DepartmentModel.findOneAndUpdate(

            idDepartment,
            {$set : {isActive : true}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async desactivateDepartment(idDepartment: ObjectIdParam, session?: ClientSession): Promise<DepartmentDocument | null> {
        
        return await this.DepartmentModel.findOneAndUpdate(

            idDepartment,
            {$set : {isActive : false}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async createDepartment(dataDepartment: DepartmentDto, session?: ClientSession): Promise<DepartmentDocument | null> {
        
        const [department] = await this.DepartmentModel.create([dataDepartment], {session});

        return department;
    }

    async updateDepartment(idDepartment: ObjectIdParam, dataUpdateDepartment: UpdateDepartmentDto, session?: ClientSession): Promise<DepartmentDocument | null> {
        
        return await this.DepartmentModel.findByIdAndUpdate(
            idDepartment,
            dataUpdateDepartment,
            {new: true, runValidators: true, session}
        ).exec();
    }

    async searchDepartmentByFilterWithOr(filter: FilterOptions<DepartmentConfigFilterKeys>): Promise<DepartmentDocument[] | null> {
        
        const orConditions = Object.entries(filter).map(([key, value]) => ({
            [key]: value
        }));

        // Si no hay condiciones, retornar array vacío
        if (orConditions.length === 0) return [];

        return await this.DepartmentModel.find({
            $or: orConditions
        }).exec();
    }

}