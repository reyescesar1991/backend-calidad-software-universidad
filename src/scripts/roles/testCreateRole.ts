import "reflect-metadata";
import { container } from "tsyringe";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { RoleDto } from "../../validations";
import { RoleService } from "../../services/role/Role.service";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";


initializeTestEnvironment();

const runTestCreateRole = async () => {

    try {


        await configureDependenciesRoles();

        const role : RoleDto = {

            idRole : '05',
            isDefault : false,
            isActive : true,
            description : 'Rol_test',
            label : 'Rol_test',
            name : 'Rol_test',
            managePermissions : false,
        }

        const roleService = container.resolve(RoleService);

        const result = await roleService.createRole(role);

        console.log("📄 Role creado:", result);
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1);  

    } finally {

        disconnectMongo();
    }
}

runTestCreateRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});