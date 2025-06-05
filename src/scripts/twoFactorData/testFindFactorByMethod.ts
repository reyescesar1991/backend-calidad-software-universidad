import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb"
import { configureDependenciesTwoFactorUser } from '../../core/config/dependenciesTwoFactorUser/dependencies';
import { container } from 'tsyringe';
import { TwoFactorService } from '../../services/oauthService';

initializeTestEnvironment();

const runTestFindFactorByMethod = async () => {

    try {

        await configureDependenciesTwoFactorUser();

        const method : string = "emailllll";

        const twoFactorService = container.resolve(TwoFactorService);

        const result = await twoFactorService.findFactorByMethod(method);

        console.log("📄 Factor de autenticación encontrado por método:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFindFactorByMethod().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});