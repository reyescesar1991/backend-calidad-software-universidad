import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { container } from 'tsyringe';
import { configureUserDependencies } from '../../core/config/dependenciesUsers/dependencies';
import { objectIdSchema } from '../../validations';
import { configureSecurityAuditDependencies } from '../../core/config/dependenciesSecurityAudit/dependencies';
import { SecurityAuditService } from '../../services/oauthService';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';

initializeTestEnvironment();

const runTestAddAttempLoginUser = async () => {

    try {

        await configureUserDependencies();
        await configureSecurityAuditDependencies();
        await configureDependenciesRoleConfig();
        await configureDependenciesRoles();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();

        const securityAuditService = container.resolve(SecurityAuditService);

        const idUser = objectIdSchema.parse("6837729bc8dd4394aae758a9");

        const result = await securityAuditService.addAttempLogin(idUser);

        console.log("📄 Intento de login sumado al registro de seguridad: ", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestAddAttempLoginUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});