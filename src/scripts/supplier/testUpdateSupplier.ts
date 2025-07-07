import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema, SupplierDto, UpdateSupplierDto } from '../../validations';
import { container } from 'tsyringe';
import { SupplierService } from '../../services/supplierService/Supplier.service';
import { configureSuppliersDependencies } from '../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../core/config/dependenciesPaymentTerms/dependencies';


initializeTestEnvironment();


const runTestUpdateSupplier = async () => {


    try {

        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();

        const idSupplier = objectIdSchema.parse("686bdd723f3c8e2924f21135")

        const dataSupplier : UpdateSupplierDto = {

            name : "test name update",
            tradeName : "test trade name update",
            contactPerson : "test contact person update",
            phoneNumber : "+57-304-234-6541",
            email : "infoTestUpdate@carnespremium.co",
            address : "test address update",
            city : "test city update",
            state : "test state update",
            zipCode : "050021",
            country : "test country update",
            paymentTerm : objectIdSchema.parse("686bcf74180cfbe5e8058243"),
            isActive : false,
            notes : "test notes update",
        };
      
        const supplierService = container.resolve(SupplierService);

        const result = await supplierService.updateSupplier(idSupplier, dataSupplier);

        console.log("📄 Proveedor actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateSupplier().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});