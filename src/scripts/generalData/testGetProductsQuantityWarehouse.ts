import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { runAllDependencies } from '../../core/config/configureAllDependencies';
import { GeneralDataService } from '../../services/generalDataService';
import { UserService } from '../../services/userService/user.service';


initializeTestEnvironment();


const runTestGetProductsQuantityWarehouse = async () => {


    try {

        await runAllDependencies();
          
        const generalDataService = container.resolve(GeneralDataService);

        const userService = container.resolve(UserService);

        const userLocation = await userService.getUserLocation("USER0044");

        const result = await generalDataService.getTotalProductWarehouseUser(userLocation);

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