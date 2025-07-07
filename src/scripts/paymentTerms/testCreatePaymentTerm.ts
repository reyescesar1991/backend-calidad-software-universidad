import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { PaymentTermDto } from '../../validations';
import { container } from 'tsyringe';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';
import { GeneralDataService } from '../../services/generalDataService';


initializeTestEnvironment();


const runTestCreatePaymentTerm = async () => {


    try {

        await configurePaymentTermsDependencies();

        const dataPaymentTerm : PaymentTermDto = {

            id : "testPaymentTerm",
            name : "payment term name",
            description : "payment term description",
            daysToPay : 15,
            discount : 5,
            isActive : true
        };
      
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.createPaymentTerm(dataPaymentTerm);

        console.log("📄 Termino de pago creado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestCreatePaymentTerm().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});