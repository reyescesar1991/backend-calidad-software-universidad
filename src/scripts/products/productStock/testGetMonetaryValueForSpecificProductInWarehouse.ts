import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { container } from 'tsyringe';
import { ProductStockService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';
import { configureProductDependencies } from '../../../core/config/dependenciesProducts/dependencies';
import { configureSuppliersDependencies } from '../../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../../core/config/dependenciesPaymentTerms/dependencies';
import { configureDependenciesHeadquarters } from '../../../core/config/dependenciesHeadquarters/dependencies';
import { configureDependenciesDepartments } from '../../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../../core/config/dependenciesWarehouses/dependencies';
import { objectIdSchema } from '../../../validations';


initializeTestEnvironment();


const runTestGetMonetaryValueForSpecificProductInWarehouse = async () => {


    try {

        await configureCategoriesDependencies();
        await configureProductDependencies();
        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();
        await configureDependenciesHeadquarters();
        await configureDependenciesDepartments();
        await configureWarehouseDependencies();

        const productId = objectIdSchema.parse("67f6b81ac5e6b5a14ec501d4");

        const warehouseId = objectIdSchema.parse("67f690a03ad8f43e09cec544");
      
        const productStockService = container.resolve(ProductStockService);

        const result = await productStockService.getMonetaryValueForSpecificProductInWarehouse(productId, warehouseId);

        console.log(`📄 Total de monto del producto ${productId} en el almacén ${warehouseId} en $ :`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestGetMonetaryValueForSpecificProductInWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});