import { inject, injectable } from "tsyringe";
import { IDepartmentRepository } from "../../../services/locationService";
import { DepartmentDocument } from "../../../db/models";
import { DepartmentAlreadyExistsError, DepartmentIsAlreadyActiveError, DepartmentIsAlreadyInactiveError, DepartmentNotFoundError, DepartmentsNotFoundByDataBaseError, DepartmentsNotFoundByFilterError, DepartmentsNotFoundByHeadquarterError, DepartmentUniqueKeysError, FilterDepartmentError } from "../../exceptions";
import { DepartmentConfigFilterKeys, FilterOptions } from "../../types";
import { DepartmentFilterSchema, ObjectIdParam } from "../../../validations";


@injectable()
export class DepartmentValidator {

    constructor(
        @inject("IDepartmentRepository") private readonly departmentRepository: IDepartmentRepository,
    ) { }

    static validateDepartmentExists(department : DepartmentDocument) : void{

        if(!department) throw new DepartmentNotFoundError();
    }

    static validateDepartmentsExistsByHeadquarter(departments : DepartmentDocument[]) : void {

        if(departments.length < 1) throw new DepartmentsNotFoundByHeadquarterError();
    }

    static validateDepartmentsExistsByFilter(departments : DepartmentDocument[]) : void {

        if(departments.length < 1) throw new DepartmentsNotFoundByFilterError();
    }

    static validateDepartmentsExistsByList(departments : DepartmentDocument[]) : void {

        if(departments.length < 1) throw new DepartmentsNotFoundByDataBaseError();
    }

    static validateDepartmentsAlreadyActivate(department : DepartmentDocument) : void {

        if(department.isActive) throw new DepartmentIsAlreadyActiveError();
    }

    static validateDepartmentsAlreadyInactivate(department : DepartmentDocument) : void {

        if(!department.isActive) throw new DepartmentIsAlreadyInactiveError();
    }

    static validateFilterOptionsHeadquarter(filter: FilterOptions<DepartmentConfigFilterKeys>): void {
    
            const resultSchema = DepartmentFilterSchema.safeParse(filter);
    
            if (!resultSchema.success) {
    
                const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
                console.log(errors);
                throw new FilterDepartmentError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
            }
        }

    async validateExistsDepartment(idDepartment : ObjectIdParam) : Promise<void> {

        const department = await this.departmentRepository.findDepartmentById(idDepartment);

        if(!department) throw new DepartmentNotFoundError();
    }

    async validateUniquenessDepartment(idDepartment : string) : Promise<void> {

        const department = await this.departmentRepository.findDepartmentByCustomId(idDepartment);

        if(department) throw new DepartmentAlreadyExistsError();
    }

    async validateUniqueKeysDepartment(filter : FilterOptions<DepartmentConfigFilterKeys>) : Promise<void> {

        const department = await this.departmentRepository.searchDepartmentByFilterWithOr(filter);

        console.log(department);
        

        if(department.length > 1) throw new DepartmentUniqueKeysError();
    }
}