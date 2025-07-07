import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema, UpdatePaymentTermDto } from '../../validations';
import { container } from 'tsyringe';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';
import { GeneralDataService } from '../../services/generalDataService';


initializeTestEnvironment();


const runTestUpdatePaymentTerm = async () => {


    try {

        await configurePaymentTermsDependencies();

        const idPaymentTerm = objectIdSchema.parse("686bcf74180cfbe5e8058243");

        const dataPaymentTerm : UpdatePaymentTermDto = {

            name : "payment term name update",
            description : "payment term description update",
            daysToPay : 10,
            discount : 7,
            isActive : true
        };
      
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.updatePaymentTerm(idPaymentTerm, dataPaymentTerm);

        console.log("📄 Termino de pago actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdatePaymentTerm().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});