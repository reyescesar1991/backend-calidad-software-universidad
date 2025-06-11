import 'reflect-metadata';
import { container } from "tsyringe";
import { configureUserDependencies } from "../../core/config/dependenciesUsers/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { SessionManagementDto } from "../../validations";
import { configureSessionManagementDependencies } from '../../core/config/dependenciesSessionManagement/dependencies';
import { SessionManagamentService, TokenService } from '../../services/oauthService';
import { configureJwtDependencies } from '../../core/config/dependenciesJwt/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';

initializeTestEnvironment();

const runTestCreateSessionUser = async () => {

    try {

        await configureDependenciesRoles();
        await configureDependenciesRoleConfig();
        await configureUserDependencies();
        await configureSessionManagementDependencies();
        await configureJwtDependencies();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();

        const jwtService = container.resolve(TokenService);

        const dataUser : SessionManagementDto = {

            userId : "USER0011",
            token : jwtService.generateToken(
                {
                    userId : "USER0011",
                    role : "01",
                }
            ),
            userAgent : "web",
            ipAddress : "192.123.4.123",
        }

        const sessionManagementService = container.resolve(SessionManagamentService);

        const result = await sessionManagementService.createSessionUser(dataUser);

        console.log("📄 Sesión de Usuario creada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateSessionUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});