import "reflect-metadata";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { FilterOptions, RoleFilterKeys } from "../../core/types";
import { container } from "tsyringe";
import { RoleService } from "../../services/role/Role.service";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";


initializeTestEnvironment();

const runTestSearchRolesByFilter = async () => {

    try {

        await configureDependenciesRoles();

        const filter : FilterOptions<RoleFilterKeys> = {

            label : "Administrador",
            name : "Gestor de Inventario"
        }

        const roleService = container.resolve(RoleService);

        const result = await roleService.searchRolesByFilters(filter);

        console.log("📄 Role encontrado por filtro:", result);
        
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }


}

runTestSearchRolesByFilter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});