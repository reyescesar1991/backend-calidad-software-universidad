import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { UserService } from "../../services/userService/user.service";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { StatusUserEnum } from '../../core/enums';

initializeTestEnvironment();

const runTestChangeStatusUser = async () => {

    try {

        await configureDependenciesRoles();
        await configureUserDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();

        const idUser = objectIdSchema.parse("6837729bc8dd4394aae758a9");

        const newStatus = StatusUserEnum.INACTIVE;

        const userService = container.resolve(UserService);

        const result = await userService.changeStatusUser(newStatus, idUser);

        console.log(`📄 Usuario cambiado de estatus a ${newStatus}: `, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestChangeStatusUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});