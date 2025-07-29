import { configureCategoriesDependencies } from "./dependenciesCategories/dependencies";
import { logger } from '../logger';
import { configureDependenciesDepartments } from "./dependenciesDepartments/dependencies";
import { configureDependenciesHeadquarters } from "./dependenciesHeadquarters/dependencies";
import { configureJwtDependencies } from "./dependenciesJwt/dependencies";
import { configureDependenciesModule } from "./dependenciesModules/dependencies";
import { configureOAuthDependencies } from "./dependenciesOAuth/dependencies";
import { configurePaymentTermsDependencies } from "./dependenciesPaymentTerms/dependencies";
import { configurePermissionsDependencies } from "./dependenciesPermissions/dependencies";
import { configureSecurityPermissionsDependencies } from "./dependenciesPermissionsSecurity/dependencies";
import { configureProductDependencies } from "./dependenciesProducts/dependencies";
import { configureDependenciesRoleConfig } from "./dependenciesRoleConfig/dependencies";
import { configureDependencies } from "./dependenciesRoutes/dependencies"
import { configureSecurityAuditDependencies } from "./dependenciesSecurityAudit/dependencies";
import { configureSessionManagementDependencies } from "./dependenciesSessionManagement/dependencies";
import { configureSubroutesDependencies } from "./dependenciesSubroutes/dependencies";
import { configureSuppliersDependencies } from "./dependenciesSuppliers/dependencies";
import { configureDependenciesTwoFactorUser } from "./dependenciesTwoFactorUser/dependencies";
import { configureDependenciesTwoFactorValueUser } from "./dependenciesTwoFactorValue/dependencies";
import { configureUserDependencies } from "./dependenciesUsers/dependencies";
import { configureWarehouseDependencies } from "./dependenciesWarehouses/dependencies";
import { configureDependenciesRoles } from "./dependenciesRoles/dependencies";
import { configureLocationDataUserDependencies } from "./dependenciesLocationUserData/dependencies";


export const runAllDependencies = async () => {

    await configureDependencies();
    await configureCategoriesDependencies();
    await configureDependenciesDepartments();
    await configureDependenciesHeadquarters();
    await configureJwtDependencies();
    await configureDependenciesModule();
    await configureOAuthDependencies();
    await configurePaymentTermsDependencies();
    await configurePermissionsDependencies();
    await configureSecurityPermissionsDependencies();
    await configureProductDependencies();
    await configureDependenciesRoleConfig();
    await configureDependenciesRoles();
    await configureSecurityAuditDependencies();
    await configureSessionManagementDependencies();
    await configureSubroutesDependencies();
    await configureSuppliersDependencies();
    await configureDependenciesTwoFactorUser();
    await configureDependenciesTwoFactorValueUser();
    await configureUserDependencies();
    await configureWarehouseDependencies();
    await configureLocationDataUserDependencies();

    logger.info('✅ Todas las dependencias han sido configuradas exitosamente.');
}