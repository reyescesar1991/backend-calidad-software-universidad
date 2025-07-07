import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';
import { GeneralDataService } from '../../services/generalDataService';


initializeTestEnvironment();


const runTestFindPaymentTermByCustomId = async () => {


    try {

        await configurePaymentTermsDependencies();

        const idPaymentTerm : string = "CREDITO30";
      
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.findPaymentTermByCustomId(idPaymentTerm);

        console.log("📄 Termino de pago encontrado por custom id:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindPaymentTermByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});