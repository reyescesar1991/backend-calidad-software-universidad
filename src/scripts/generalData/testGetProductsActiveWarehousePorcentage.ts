import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { runAllDependencies } from '../../core/config/configureAllDependencies';
import { GeneralDataService } from '../../services/generalDataService';
import { objectIdSchema } from '../../validations';


initializeTestEnvironment();


const runTestGetProductsActiveWarehousePorcentage = async () => {


    try {

        await runAllDependencies();
          
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.getProductsActiveWarehousePorcentage(objectIdSchema.parse("67f690a03ad8f43e09cec544"));

        console.log("📄 Porcentaje de productos activos en el almacén:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestGetProductsActiveWarehousePorcentage().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});