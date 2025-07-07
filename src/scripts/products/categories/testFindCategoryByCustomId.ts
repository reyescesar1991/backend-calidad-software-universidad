import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { container } from 'tsyringe';
import { ProductService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';


initializeTestEnvironment();


const runTestFindCategoryByCustomId = async () => {


    try {

        await configureCategoriesDependencies();

        const idCategory : string = "VER";
      
        const productService = container.resolve(ProductService);

        const result = await productService.findCategoryByCustomId(idCategory);

        console.log("📄 Categoria encontrada por custom id:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindCategoryByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});