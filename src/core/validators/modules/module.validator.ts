import { injectable } from "tsyringe";
import { ModuleDocument } from "../../../db/models";
import { FilterModuleError, ModuleNotFoundError, ModulesNotFoundByFilterError } from "../../exceptions";
import { FilterOptions, ModuleFilterKeys } from "../../types";
import { ModuleFilterSchemaZod } from "../../../validations";

@injectable()
export class ModuleValidator {


    static validateFoundRoute(module: ModuleDocument): void {

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
}