import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { UserService } from "../../services/userService/user.service";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { configureDependencies } from '../../core/config/dependenciesRoutes/dependencies';

initializeTestEnvironment();

const runTestGetUserStatus = async () => {

    try {

        await configureDependenciesRoles();
        await configureUserDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();
        await configureDependencies();

        const idUser : string = "USER0044";

        const userService = container.resolve(UserService);

        // const result = await userService.getCustomPermissionsUser(idUser);
        
        // const subroutesUser = await userService.getSubroutesUser(idUser);

        const menu = await userService.buildUserMenu(idUser);

        console.log("MENU (JSON) : ", JSON.stringify(menu, null, 2));
        

        // console.log(`📄 Las subrutas del usuario ${idUser} son: `, subroutesUser);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestGetUserStatus().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});