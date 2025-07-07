import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { objectIdSchema } from '../../../validations';
import { container } from 'tsyringe';
import { ProductService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';


initializeTestEnvironment();


const runTestDontViewableCategory = async () => {


    try {

        await configureCategoriesDependencies();

        const idCategory = objectIdSchema.parse("67f53221794205960e288b6a");
      
        const productService = container.resolve(ProductService);

        const result = await productService.dontViewableCategory(idCategory);

        console.log("📄 Categoria encontrada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestDontViewableCategory().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});