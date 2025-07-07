import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestFindSupplierById = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const idSupplierTerm = objectIdSchema.parse("67e701d40d06e2ab18b4172d");
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.findSupplierById(idSupplierTerm);

        console.log("📄 Proveedor encontrado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindSupplierById().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});