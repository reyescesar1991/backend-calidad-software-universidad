import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema, SupplierDto } from '../../validations';
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestCreateSupplier = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const dataSupplier : SupplierDto = {

            id : "SUP-COL-005",
            name : "test name",
            tradeName : "test trade name",
            contactPerson : "test contact person",
            phoneNumber : "+57-304-234-6542",
            email : "infoTest@carnespremium.co",
            address : "test address",
            city : "test city",
            state : "test state",
            zipCode : "050021",
            country : "test country",
            taxId : "890.987.654-2",
            businessRegistrationNumber : "00987654",
            paymentTerm : objectIdSchema.parse("67e59b7a75973ad506ea487f"),
            isActive : true,
            notes : "test notes",
        };
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.createSupplier(dataSupplier);

        console.log("📄 Proveedor creado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateSupplier().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});