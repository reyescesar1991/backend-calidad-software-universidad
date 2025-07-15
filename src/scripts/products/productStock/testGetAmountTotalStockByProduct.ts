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


const runTestGetAmountTotalStockByProduct = async () => {


    try {

        await configureCategoriesDependencies();
        await configureProductDependencies();
        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();
        await configureDependenciesHeadquarters();
        await configureDependenciesDepartments();
        await configureWarehouseDependencies();

        const productId = objectIdSchema.parse("67f6b81ac5e6b5a14ec501cb");
      
        const productStockService = container.resolve(ProductStockService);

        const result = await productStockService.getAmountTotalStockByProduct(productId);

        console.log(`Monto total de este producto en todos los almacenes:`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestGetAmountTotalStockByProduct().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});