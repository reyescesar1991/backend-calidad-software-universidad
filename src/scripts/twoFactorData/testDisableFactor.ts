import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { TwoFactorService } from '../../services/oauthService';
import { objectIdSchema } from '../../validations';

initializeTestEnvironment();

const runTestDisableFactor = async () => {

    try {

        await configureDependenciesTwoFactorUser();

        const idFactor = objectIdSchema.parse("67e9e6c034fe5c9d5ab4acf0");

        const twoFactorService = container.resolve(TwoFactorService);

        const result = await twoFactorService.disableFactor(idFactor);

        console.log("📄 Factor de autenticación desactivado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestDisableFactor().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});