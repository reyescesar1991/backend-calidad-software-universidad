import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { TwoFactorService } from '../../services/oauthService';
import { objectIdSchema, UpdateTwoFactorAuthDto } from '../../validations';

initializeTestEnvironment();

const runTestUpdateFactor = async () => {

    try {

        await configureDependenciesTwoFactorUser();

        const idFactor = objectIdSchema.parse("6841f4b07408799cb009a41a");

        const dataUpdate : UpdateTwoFactorAuthDto = {

            method : "test2",
        }

        const twoFactorService = container.resolve(TwoFactorService);

        const result = await twoFactorService.updateFactor(idFactor, dataUpdate);

        console.log("📄 Factor de autenticación encontrado y actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateFactor().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});