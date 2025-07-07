import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';
import { GeneralDataService } from '../../services/generalDataService';


initializeTestEnvironment();


const runTestActivatePaymentTerm = async () => {


    try {

        await configurePaymentTermsDependencies();

        const idPaymentTerm = objectIdSchema.parse("67e59b7a75973ad506ea487d");
      
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.activatePaymentTerm(idPaymentTerm);

        console.log("📄 Termino de pago ahora activo:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestActivatePaymentTerm().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});