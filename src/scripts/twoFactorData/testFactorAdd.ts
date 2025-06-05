import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { TwoFactorService } from '../../services/oauthService';
import { TwoFactorAuthDto } from '../../validations';

initializeTestEnvironment();

const runTestAddFactor = async () => {

    try {

        await configureDependenciesTwoFactorUser();

        const dataFactor : TwoFactorAuthDto = {

            method : "test",
            isEnabled : true,
            quantityUsers : 0,
        };

        const twoFactorService = container.resolve(TwoFactorService);

        const result = await twoFactorService.addFactor(dataFactor);

        console.log("📄 Factor de autenticación agregado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestAddFactor().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});