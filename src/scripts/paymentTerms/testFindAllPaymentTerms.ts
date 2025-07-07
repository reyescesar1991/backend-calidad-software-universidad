import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';
import { GeneralDataService } from '../../services/generalDataService';


initializeTestEnvironment();


const runTestFindAllPaymentTerms = async () => {


    try {

        await configurePaymentTermsDependencies();
      
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.findAllPaymentTerms();

        console.log("📄 Terminos de pago encontrados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindAllPaymentTerms().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});