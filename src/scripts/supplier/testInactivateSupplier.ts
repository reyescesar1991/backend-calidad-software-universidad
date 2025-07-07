import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestInactivateSupplier = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const idSupplierTerm = objectIdSchema.parse("686bdd723f3c8e2924f21135");
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.inactivateSupplier(idSupplierTerm);

        console.log("📄 Proveedor inactivado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestInactivateSupplier().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});