import "reflect-metadata";
import { container } from "tsyringe";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { RoleService } from "../../services/role/Role.service";


initializeTestEnvironment();

const runTestFindRoleByCustomId = async () => {

    try {

        await configureDependenciesRoles();

        const customIdRole : string = "01";

        const roleService = container.resolve(RoleService);

        const result = await roleService.findRoleByCustomId(customIdRole);

        console.log("📄 Role encontrado por ID:", result);
        
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }


}

runTestFindRoleByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});