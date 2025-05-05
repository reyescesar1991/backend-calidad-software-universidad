import { inject, injectable } from "tsyringe";
import { ModuleDocument } from "../../../db/models";
import { FilterModuleError, ModuleAlreadyActiveError, ModuleAlreadyExistsError, ModuleAlreadyInactiveError, ModuleNotFoundError, ModulesNotFoundByFilterError } from "../../exceptions";
import { FilterOptions, ModuleFilterKeys } from "../../types";
import { ModuleFilterSchemaZod } from "../../../validations";
import { IModuleRepository } from "../../../services/menu";

@injectable()
export class ModuleValidator {

    constructor(@inject("IModuleRepository") private readonly moduleRepository : IModuleRepository){}


    static validateFoundModule(module: ModuleDocument): void {

        if (!module) throw new ModuleNotFoundError();
    }

    static validateModuleFilter(filter: FilterOptions<ModuleFilterKeys>): void {

        const resultSchema = ModuleFilterSchemaZod.safeParse(filter);

        if (!resultSchema.success) {

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterModuleError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }

    static validateFoundModules(modules : ModuleDocument[]) : void {

        if(modules.length === 0) throw new ModulesNotFoundByFilterError();
    }

    static validateStatusModuleActive(module: ModuleDocument) : void {

        if(module.active) throw new ModuleAlreadyActiveError();
    }

    static validateStatusModuleInactive(module : ModuleDocument) : void {

        if(!module.active) throw new ModuleAlreadyInactiveError();
    }

    async validateUniquenessesModule(customId : string) : Promise<void>{


        const exists = await this.moduleRepository.findModuleByCustomId(customId);

        if(exists) throw new ModuleAlreadyExistsError();
    }
}