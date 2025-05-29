import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { UserService } from "../../services/userService/user.service";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { FilterOptions, UserConfigFilterKeys } from '../../core/types';
import { StatusUserEnum } from '../../core/enums';
import { objectIdSchema } from '../../validations';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';

initializeTestEnvironment();

const runTestSearchUserByFilter = async () => {

    try {

        await configureDependenciesRoles();
        await configureUserDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();

        const filter : FilterOptions<UserConfigFilterKeys> = {

            // idUser : "USER9999"
            // "name" : "Test"
            // lastName : "Test"
            // codeCountry : "58"
            // phoneNumber : "04242746760"
            // email : "testestest@gmail.com"
            // username : "testUser"
            // status : StatusUserEnum.PENDING
            // hasTwoFactor : false
            // department : objectIdSchema.parse("682e325a174576bd98f15671")
            // roleConfig : objectIdSchema.parse("68263fc7f016933bfed2ec24")
        };

        const userService = container.resolve(UserService);

        const result = await userService.searchUserByFilter(filter);

        console.log("📄 Usuarios encontrados por filtro:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestSearchUserByFilter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});