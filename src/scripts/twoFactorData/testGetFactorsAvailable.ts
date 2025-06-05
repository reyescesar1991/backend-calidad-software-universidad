import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { TwoFactorService } from '../../services/oauthService';

initializeTestEnvironment();

const runTestGetFactorsAvailable = async () => {

    try {

        await configureDependenciesTwoFactorUser();

        const twoFactorService = container.resolve(TwoFactorService);

        const result = await twoFactorService.getFactorsAvailable();

        console.log("📄 Factores de autenticación disponibles:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestGetFactorsAvailable().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});