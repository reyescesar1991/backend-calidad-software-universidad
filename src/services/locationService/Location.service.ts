import { inject, injectable } from "tsyringe";
import { IHeadquarterRepository } from "./interfaces/IHeadquarterRepository";
import { DepartmentValidator, HeadquarterValidator } from "../../core/validators";
import { DepartmentDto, HeadquarterDto, ObjectIdParam, UpdateDepartmentDto, UpdateHeadquarterDto } from "../../validations";
import { DepartmentDocument, HeadquartersDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { TransactionManager } from "../../core/database/transactionManager";
import { DepartmentConfigFilterKeys, FilterOptions, HeadquarterConfigFilterKeys } from "../../core/types";
import { IDepartmentRepository } from "./interfaces/IDepartmentRepository";

@injectable()
export class LocationService {

    constructor(
        @inject("IHeadquarterRepository") private readonly headquarterRepository : IHeadquarterRepository,
        @inject("HeadquarterValidator") private readonly headquarterValidator : HeadquarterValidator,
        @inject("TransactionManager") private readonly transactionManager : TransactionManager,

        @inject("IDepartmentRepository") private readonly departmentRepository : IDepartmentRepository,
        @inject("DepartmentValidator") private readonly departmentValidator : DepartmentValidator,

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
}