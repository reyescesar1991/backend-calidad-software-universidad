import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { objectIdSchema, UpdateCategoryProductDto } from '../../../validations';
import { container } from 'tsyringe';
import { ProductService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';


initializeTestEnvironment();


const runTestUpdateCategory = async () => {


    try {

        await configureCategoriesDependencies();

        const idCategory = objectIdSchema.parse("686c291869c01867f3725034");

        const dataCreateCategory : UpdateCategoryProductDto = {

            label : "Test Update",
            name : "Test Update",
            slug : "Test Update",
            description : "Test Update",
        };
      
        const productService = container.resolve(ProductService);

        const result = await productService.updateCategory(idCategory, dataCreateCategory);

        console.log("📄 Categoria encontrada y actualizada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateCategory().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});