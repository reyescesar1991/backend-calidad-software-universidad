import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { runAllDependencies } from '../../core/config/configureAllDependencies';
import { GeneralDataService } from '../../services/generalDataService';


initializeTestEnvironment();


const runTestGetProductsQuantityWarehouse = async () => {


    try {

        await runAllDependencies();
          
        const generalDataService = container.resolve(GeneralDataService);

        const result = await generalDataService.getTotalProductWarehouseUser("USER0044");

        console.log("📄 Productos registrados en ese almacen:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestGetProductsQuantityWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});