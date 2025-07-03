import { inject, injectable } from "tsyringe";
import { IHeadquarterRepository } from "./interfaces/IHeadquarterRepository";
import { DepartmentValidator, HeadquarterValidator, WarehouseValidator } from "../../core/validators";
import { DepartmentDto, HeadquarterDto, ObjectIdParam, UpdateDepartmentDto, UpdateHeadquarterDto, UpdateWarehouseDto, WarehouseDto } from "../../validations";
import { DepartmentDocument, HeadquartersDocument, WarehouseDocument } from "../../db/models";
import { AddBoxesFormatError, DecreaseBoxesFormatError, handleError } from "../../core/exceptions";
import { TransactionManager } from "../../core/database/transactionManager";
import { DepartmentConfigFilterKeys, FilterOptions, HeadquarterConfigFilterKeys } from "../../core/types";
import { IDepartmentRepository } from "./interfaces/IDepartmentRepository";
import { IWarehouseRepository } from "./interfaces/IWarehouseRepository";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";

@injectable()
export class LocationService {

    constructor(
        @inject("IHeadquarterRepository") private readonly headquarterRepository : IHeadquarterRepository,
        @inject("HeadquarterValidator") private readonly headquarterValidator : HeadquarterValidator,
        @inject("TransactionManager") private readonly transactionManager : TransactionManager,

        @inject("IDepartmentRepository") private readonly departmentRepository : IDepartmentRepository,
        @inject("DepartmentValidator") private readonly departmentValidator : DepartmentValidator,

        @inject("IWarehouseRepository") private readonly warehouseRepository : IWarehouseRepository,
        @inject("WarehouseValidator") private readonly warehouseValidator : WarehouseValidator,

    ){}

    async findHeadquarterById(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>{

        try {

            const headquarter = await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

            return headquarter;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findHeadquarterByCustomId(customIdHeadquarter : string) : Promise<HeadquartersDocument | null>{

        try {

            const headquarter = await this.headquarterValidator.validateHeadquarterExistsWithCustomId(customIdHeadquarter);

            return headquarter;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async searchHeadquarterByFilter(filter: FilterOptions<HeadquarterConfigFilterKeys>): Promise<HeadquartersDocument[] | null>{

        try {

            HeadquarterValidator.validateFilterOptionsHeadquarter(filter);

            const headquarters = await this.headquarterValidator.validateHeadquartersByFilter(filter);

            return headquarters;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async listHeadquarter() : Promise<HeadquartersDocument[] | null>{

        try {

            const headquarter = await this.headquarterValidator.validateHeadquartersList();

            return headquarter;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async activateHeadquarter(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterIsAlreadyActive(idHeadquarter);

                    return await this.headquarterRepository.activateHeadquarter(idHeadquarter, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async desactivateHeadquarter(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterIsAlreadyDesactive(idHeadquarter);

                    return await this.headquarterRepository.desactivateHeadquarter(idHeadquarter, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async createHeadquarter(dataHeadquarter : HeadquarterDto) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.headquarterValidator.validateHeadquarterUniqueness(dataHeadquarter.idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterUniqueKeys(
                        {
                            label : dataHeadquarter.label,
                            phoneNumber : dataHeadquarter.phoneNumber,
                            email : dataHeadquarter.email,
                        }
                    )

                    return await this.headquarterRepository.createHeadquarter(dataHeadquarter, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async updateHeadquarter(idHeadquarter : ObjectIdParam, dataUpdateHeadquarter : UpdateHeadquarterDto) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {


                try {

                    await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterUniqueKeys(
                        {
                            label : dataUpdateHeadquarter.label,
                            phoneNumber : dataUpdateHeadquarter.phoneNumber,
                            email : dataUpdateHeadquarter.email,
                            name : dataUpdateHeadquarter.name,
                        }
                    );

                    const headquarter = await this.headquarterRepository.updateHeadquarter(idHeadquarter, dataUpdateHeadquarter, session);

                    return headquarter;

                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
        
    }

    //Departments

    async findDepartmentById(idDepartment : ObjectIdParam) : Promise<DepartmentDocument | null>{

        try {

            const department = await this.departmentRepository.findDepartmentById(idDepartment);

            DepartmentValidator.validateDepartmentExists(department);

            return department;
            
        } catch (error) {
         
            handleError(error);
        }
    }

    async findDepartmentByCustomId(customIdDepartment : string) : Promise<DepartmentDocument | null>{

        try {
            
            const department = await this.departmentRepository.findDepartmentByCustomId(customIdDepartment);

            DepartmentValidator.validateDepartmentExists(department);

            return department;

        } catch (error) {
            
            handleError(error);
        }
    }

    async findDepartmentsByHeadquarter(idHeadquarter : ObjectIdParam) : Promise<DepartmentDocument[] | null>{

        try {

            await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

            const departments = await this.departmentRepository.findDepartmentsByHeadquarter(idHeadquarter);

            DepartmentValidator.validateDepartmentsExistsByHeadquarter(departments);

            return departments;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async searchDepartmentByFilter(filter : FilterOptions<DepartmentConfigFilterKeys>) : Promise<DepartmentDocument[] | null>{

        try {

            DepartmentValidator.validateFilterOptionsHeadquarter(filter);

            const departments = await this.departmentRepository.searchDepartmentByFilter(filter);

            DepartmentValidator.validateDepartmentsExistsByFilter(departments);

            return departments;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async listDepartment() : Promise<DepartmentDocument[] | null>{

        try {

            const departments = await this.departmentRepository.listDepartment();

            DepartmentValidator.validateDepartmentsExistsByList(departments);

            return departments;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async activateDepartment(idDepartment : ObjectIdParam) : Promise<DepartmentDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.departmentValidator.validateExistsDepartment(idDepartment);

                    const department = await this.departmentRepository.findDepartmentById(idDepartment);

                    DepartmentValidator.validateDepartmentsAlreadyActivate(department);

                    return await this.departmentRepository.activateDepartment(idDepartment, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async desactivateDepartment(idDepartment : ObjectIdParam) : Promise<DepartmentDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.departmentValidator.validateExistsDepartment(idDepartment);

                    const department = await this.departmentRepository.findDepartmentById(idDepartment);

                    DepartmentValidator.validateDepartmentsAlreadyInactivate(department);

                    return await this.departmentRepository.desactivateDepartment(idDepartment, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async createDepartment(dataDepartment : DepartmentDto) : Promise<DepartmentDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.departmentValidator.validateUniquenessDepartment(dataDepartment.idDepartment);

                    await this.departmentValidator.validateUniqueKeysDepartment({

                        idDepartment : dataDepartment.idDepartment
                    });

                    //Validamos que la sucursal exista
                    await this.headquarterValidator.validateHeadquarterExists(dataDepartment.headquartersId);

                    return await this.departmentRepository.createDepartment(dataDepartment, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async updateDepartment(idDepartment : ObjectIdParam, dataUpdateDepartment : UpdateDepartmentDto) : Promise<DepartmentDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.departmentValidator.validateExistsDepartment(idDepartment);

                    return await this.departmentRepository.updateDepartment(idDepartment, dataUpdateDepartment, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async findWarehouseById(idWarehouse: ObjectIdParam): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            return warehouse;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findWarehouseByCustomId(idWarehouse: string): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseByCustomId(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            return warehouse;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async createWarehouse(dataWarehouse: WarehouseDto, session?: ClientSession): Promise<WarehouseDocument | null>{

        try {

            await this.warehouseValidator.validateIdWarehouseUniqueness(dataWarehouse.idWarehouse);

            await this.findHeadquarterById(dataWarehouse.idHeadquarter);

            const warehouse = await this.warehouseRepository.createWarehouse(dataWarehouse, session);

            return warehouse;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async updateWarehouse(idWarehouse: ObjectIdParam, dataUpdateWarehouse: UpdateWarehouseDto, session?: ClientSession): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            const updatedWarehouse = await this.warehouseRepository.updateWarehouse(warehouse._id, dataUpdateWarehouse, session);

            return updatedWarehouse;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async inactivateWarehouse(idWarehouse: ObjectIdParam, session?: ClientSession): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);

            return await this.warehouseRepository.inactivateWarehouse(idWarehouse, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async activateWarehouse(idWarehouse: ObjectIdParam, session?: ClientSession): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            WarehouseValidator.validateWarehouseIsAlreadyActive(warehouse);

            return await this.warehouseRepository.activateWarehouse(idWarehouse, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findAllWarehouses(): Promise<WarehouseDocument[] | null>{

        try {

            return await this.warehouseRepository.findAllWarehouses();
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getCapacityWarehouse(idWarehouse: ObjectIdParam): Promise<number | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            return await this.warehouseRepository.getCapacityWarehouse(idWarehouse);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async updateCapacityWarehousePerPallet(idWarehouse: ObjectIdParam, newCurrentCapacityPallet: number, session?: ClientSession): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);

            return await this.warehouseRepository.updateCapacityWarehousePerPallet(idWarehouse, newCurrentCapacityPallet, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getCurrentCapacityWarehouse(idWarehouse: ObjectIdParam): Promise<number | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            return await this.warehouseRepository.getCurrentCapacityWarehouse(idWarehouse);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async addCurrentCapacityWarehousePerBox(idWarehouse: ObjectIdParam, addBoxes: number, session?: ClientSession): Promise<WarehouseDocument | null>{

       try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);

            if(addBoxes > 0){

                return await this.warehouseRepository.addCurrentCapacityWarehousePerBox(idWarehouse, addBoxes, session);
            }
            else{

                throw new AddBoxesFormatError();
            }
            
        } catch (error) {
            
            handleError(error);
        } 
    }

    @Transactional()
    async decreaseCurrentCapacityWarehousePerBox(idWarehouse: ObjectIdParam, decreaseBoxes: number, session?: ClientSession): Promise<WarehouseDocument | null>{

        try {

            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);

            if(decreaseBoxes > 0){

                return await this.warehouseRepository.addCurrentCapacityWarehousePerBox(idWarehouse, decreaseBoxes, session);
            }
            else{

                throw new DecreaseBoxesFormatError();
            }
            
        } catch (error) {
            
            handleError(error);
        }
    }
}