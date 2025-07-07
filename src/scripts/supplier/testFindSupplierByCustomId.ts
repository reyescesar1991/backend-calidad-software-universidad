import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestFindSupplierByCustomId = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const customIdSupplierTerm : string = "SUP-COL-004";
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.findSupplierByCustomId(customIdSupplierTerm);

        console.log("📄 Proveedor encontrado por ID custom:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindSupplierByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});