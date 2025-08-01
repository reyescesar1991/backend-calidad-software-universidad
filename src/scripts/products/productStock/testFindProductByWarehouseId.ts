import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { objectIdSchema } from '../../../validations';
import { container } from 'tsyringe';
import { ProductStockService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';
import { configureProductDependencies } from '../../../core/config/dependenciesProducts/dependencies';
import { configureSuppliersDependencies } from '../../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../../core/config/dependenciesPaymentTerms/dependencies';
import { configureDependenciesHeadquarters } from '../../../core/config/dependenciesHeadquarters/dependencies';
import { configureDependenciesDepartments } from '../../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../../core/config/dependenciesWarehouses/dependencies';


initializeTestEnvironment();


const runTestFindProductStockByIdWarehouse = async () => {


    try {

        await configureCategoriesDependencies();
        await configureProductDependencies();
        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();
        await configureDependenciesHeadquarters();
        await configureDependenciesDepartments();
        await configureWarehouseDependencies();

        const warehouseId = objectIdSchema.parse("67f690a03ad8f43e09cec544");
      
        const productStockService = container.resolve(ProductStockService);

        const result = await productStockService.findProductByWarehouseId(warehouseId);

        console.log("📄 Stock de producto encontrado por id de almacen:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindProductStockByIdWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});