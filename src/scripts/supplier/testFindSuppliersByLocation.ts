import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestFindSupplierByLocation = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const city : string = "";
        const state : string = "";
        const country : string = "Venezuela";
        const isActive : string = "";
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.findSuppliersByLocation(city, state, country, true);

        console.log("📄 Proveedor encontrados por ubicacion:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindSupplierByLocation().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});