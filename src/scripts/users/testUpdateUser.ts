import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema, UpdateUserDto, UserDto } from "../../validations";
import { UserService } from "../../services/userService/user.service";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';

initializeTestEnvironment();

const runTestUpdateUser = async () => {

    try {

        await configureDependenciesRoles();
        await configureUserDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();

        const dataUser : UpdateUserDto = {

            // roleConfig : objectIdSchema.parse("68263fc7f016933bfed2ec24"),
            // department : objectIdSchema.parse("67eead413bf36442a108d301"),
            // phoneNumber : "04161119988"
            name : "Test Update Name",
            lastName : "Test Update Lastname"
        }

        const idUser = objectIdSchema.parse("6837729bc8dd4394aae758a9");

        const userService = container.resolve(UserService);

        const result = await userService.updateUser(idUser, "USER9999", dataUser);

        console.log("📄 Usuario actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});