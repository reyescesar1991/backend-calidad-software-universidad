import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema, UserDto } from "../../validations";
import { UserService } from "../../services/userService/user.service";
import { StatusUserEnum } from "../../core/enums";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';

initializeTestEnvironment();

const runTestCreateUser = async () => {

    try {

        await configureDependenciesRoles();
        await configureUserDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();

        const dataUser : UserDto = {

            idUser : "USER9999",
            name : "Test",
            lastName : "Test",
            codeCountry : "58",
            phoneNumber : "04242746760",
            email : "testestest@gmail.com",
            password : "Contraseña.Test.01",
            username : "testUser",
            status : StatusUserEnum.ACTIVE,
            hasTwoFactor : false,
            department : objectIdSchema.parse("682e325a174576bd98f15671"),
            roleConfig : objectIdSchema.parse("68263fc7f016933bfed2ec24"),
        }

        const idRole = objectIdSchema.parse("68263fc7f016933bfed2ec24");

        const userService = container.resolve(UserService);

        const result = await userService.createUser(dataUser, idRole);

        console.log("📄 Usuario creado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});