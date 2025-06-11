import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { UpdateSessionManagementDto } from "../../validations";
import { configureSessionManagementDependencies } from '../../core/config/dependenciesSessionManagement/dependencies';
import { SessionManagamentService } from '../../services/oauthService';
import { configureJwtDependencies } from '../../core/config/dependenciesJwt/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';

initializeTestEnvironment();

const runTestUpdateSessionUser = async () => {

    try {

        await configureDependenciesRoles();
        await configureDependenciesRoleConfig();
        await configureUserDependencies();
        await configureSessionManagementDependencies();
        await configureJwtDependencies();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();

        const dataUser : UpdateSessionManagementDto = {

            token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVU0VSMDAxMSIsImxhdCI6MTc0OTY2NzgzNCwiZXhwIjoxNzQ5NjcxNDM0LCJyb2xlIjoiMDEiLCJpYXQiOjE3NDk2Njc4MzR9.JoLcVkqxcE2JwatStMmyLtUpaREypo1EcDPXRABBvio"
        }

        const sessionManagementService = container.resolve(SessionManagamentService);

        const result = await sessionManagementService.updateSessionUser(dataUser);

        console.log("📄 Sesión de Usuario creada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateSessionUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});