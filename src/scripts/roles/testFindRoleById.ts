import "reflect-metadata";
import { container } from "tsyringe";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { RoleService } from "../../services/role/Role.service";


initializeTestEnvironment();

const runTestFindRoleById = async () => {

    try {

        await configureDependenciesRoles();

        const idRole = objectIdSchema.parse("67f7f5ff4f0b312a2319fc56");

        const roleService = container.resolve(RoleService);

        const result = await roleService.findRoleById(idRole);

        console.log("📄 Role encontrado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRoleById().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});