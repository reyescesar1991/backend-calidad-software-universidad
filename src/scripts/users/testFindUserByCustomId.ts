import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { UserService } from "../../services/userService/user.service";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';

initializeTestEnvironment();

const runTestFindUserByCustomId = async () => {

    try {

        await configureDependenciesRoles();
        await configureUserDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();

        const idUser : string = "USER9999";

        const userService = container.resolve(UserService);

        const result = await userService.findUserByCustomId(idUser);

        console.log("📄 Usuario encontrado por ID custom:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFindUserByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});