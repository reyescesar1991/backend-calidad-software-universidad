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

const runTestVerify2FARecoveryUser = async () => {

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

        const idUser : string = "USER9999";

        const code : string = "760524";

        const result = await oauthService.verify2FAUsernameRecover({code : code, userId : idUser});

        console.log("📄 2do factor verificado para la recuperacion de usuario: ", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestVerify2FARecoveryUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});