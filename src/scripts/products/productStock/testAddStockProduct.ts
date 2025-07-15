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


initializeTestEnvironment();


const runTestAddStockProduct = async () => {


    try {

        await configureCategoriesDependencies();
        await configureProductDependencies();
        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();
        await configureDependenciesHeadquarters();
        await configureDependenciesDepartments();
        await configureWarehouseDependencies();

        const productCustomId : string = "PROD000002";

        const warehouseCustomId : string = "ALM-Car-001";
      
        const productStockService = container.resolve(ProductStockService);

        const result = await productStockService.addStockProduct(productCustomId, warehouseCustomId, 10);

        console.log(`📄 Producto ${productCustomId} agregado al almacén ${warehouseCustomId}:`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestAddStockProduct().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});