import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { configureUserDependencies } from '../../core/config/dependenciesUsers/dependencies';
import { TwoFactorUserService } from '../../services/oauthService/services/TwoFactorUser.service';
import { objectIdSchema } from '../../validations';
import { configureDependenciesTwoFactorValueUser } from '../../core/config/dependenciesTwoFactorValue/dependencies';

initializeTestEnvironment();

const runTestFactorValue = async () => {

    try {

        await configureUserDependencies();
        await configureDependenciesTwoFactorUser();
        await configureDependenciesTwoFactorValueUser()

        const twoFactorValueService = container.resolve(TwoFactorUserService);

        const userId = objectIdSchema.parse("6837729bc8dd4394aae758a9");

        const result = await twoFactorValueService.generateAndSendCode(userId , "careyes.19@est.ucab.edu.ve");

        console.log("📄 Factores de autenticación disponibles:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFactorValue().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});