import "reflect-metadata";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";
import { container } from "tsyringe";
import { RoleService } from "../../services/role/Role.service";


initializeTestEnvironment();

const runTestListRoles = async () => {

    try {

        await configureDependenciesRoles();

        const roleService = container.resolve(RoleService);

        const result = await roleService.listRoles();

        console.log("📄 Roles registrados en la base de datos:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestListRoles().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});