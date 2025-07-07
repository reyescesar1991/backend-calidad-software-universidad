import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { objectIdSchema } from '../../../validations';
import { container } from 'tsyringe';
import { ProductService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';


initializeTestEnvironment();


const runTestFindCategoryByLabel = async () => {


    try {

        await configureCategoriesDependencies();

        const labelCategory : string = "Verduras";
      
        const productService = container.resolve(ProductService);

        const result = await productService.findCategoryByLabel(labelCategory);

        console.log("📄 Categoria encontrada por etiqueta:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindCategoryByLabel().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});