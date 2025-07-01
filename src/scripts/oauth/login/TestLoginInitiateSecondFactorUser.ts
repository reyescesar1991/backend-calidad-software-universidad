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

const runTestLogin2FAUser = async () => {

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

        const preAuthToken : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwidXNlcklkIjoiVVNFUjk5OTkiLCJqdGkiOiIyZjFmZTBiYS1lYzdkLTQ5MDAtODgyOS05NDhiZmEzY2M2MzYiLCJsYXQiOjE3NTEzODQ5ODksImV4cCI6MTc1MTM4NTA0OSwiaWF0IjoxNzUxMzg0OTg5fQ.Jfl4B0fCQw1WN6O__VpyQJMqLd-Rdr_-N3-jWkvsR3o";

        const result = await oauthService.initiateLogin2FA({preAuthToken : preAuthToken, userId : idUser});

        console.log("📄 Login realizado con exito: ", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestLogin2FAUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});