import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestFindSupplierByPaymentTerm = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const idSupplierPaymentTerm = objectIdSchema.parse("67e59b7a75973ad506ea487c");
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.findSuppliersByPaymentTerm(idSupplierPaymentTerm);

        console.log(`📄 Proveedores con el termino de pago ${idSupplierPaymentTerm}:`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindSupplierByPaymentTerm().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});