import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { configureUserDependencies } from '../../core/config/dependenciesUsers/dependencies';
import { TwoFactorUserService } from '../../services/oauthService/services/TwoFactorUser.service';
import { objectIdSchema } from '../../validations';
import { configureDependenciesTwoFactorValueUser } from '../../core/config/dependenciesTwoFactorValue/dependencies';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureSecurityAuditDependencies } from '../../core/config/dependenciesSecurityAudit/dependencies';

initializeTestEnvironment();

const runTestCompareFactor = async () => {

    try {

        await configureUserDependencies();
        await configureDependenciesTwoFactorUser();
        await configureDependenciesTwoFactorValueUser();
        await configureDependenciesRoles();
        await configureDependenciesRoleConfig();
        await configureDependenciesDepartments();
        await configureDependenciesTwoFactorUser();
        await configureSecurityAuditDependencies();

        const twoFactorValueService = container.resolve(TwoFactorUserService);

        const userId = objectIdSchema.parse("6837729bc8dd4394aae758a9");

        const result = await twoFactorValueService.validateFactorUser(userId , "536135");

        console.log(`📄 El código ${result ? 'si' : 'no'} coincide con el enviado`);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestCompareFactor().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});