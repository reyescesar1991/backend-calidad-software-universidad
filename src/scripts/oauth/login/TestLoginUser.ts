import 'reflect-metadata';
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { configureUserDependencies } from '../../../core/config/dependenciesUsers/dependencies';
import { configureSecurityAuditDependencies } from '../../../core/config/dependenciesSecurityAudit/dependencies';
import { configureDependenciesRoleConfig } from '../../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesRoles } from '../../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesDepartments } from '../../../core/config/dependenciesDepartments/dependencies';
import { configureDependenciesTwoFactorUser } from '../../../core/config/dependenciesTwoFactorUser/dependencies';
import { configureJwtDependencies } from '../../../core/config/dependenciesJwt/dependencies';
import { OAuthService } from '../../../services/oauthService/OAuth.service';
import { configureOAuthDependencies } from '../../../core/config/dependenciesOAuth/dependencies';
import { configureDependenciesTwoFactorValueUser } from '../../../core/config/dependenciesTwoFactorValue/dependencies';
import { configureSessionManagementDependencies } from '../../../core/config/dependenciesSessionManagement/dependencies';

initializeTestEnvironment();

const runTestLoginUser = async () => {

    try {

        await configureUserDependencies();
        await configureSecurityAuditDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesRoles();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();
        await configureJwtDependencies();
        await configureOAuthDependencies();
        await configureDependenciesTwoFactorUser();
        await configureDependenciesTwoFactorValueUser();
        await configureSessionManagementDependencies();

        const oauthService = container.resolve(OAuthService);

        const idUser : string = "testUser";

        const password : string = "Hola123%34";

        const result = await oauthService.loginUser({username : idUser, password : password});

        console.log("📄 Login realizado con exito: ", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestLoginUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});