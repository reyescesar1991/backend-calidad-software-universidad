import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { CategoryProductDto, objectIdSchema } from '../../../validations';
import { container } from 'tsyringe';
import { ProductService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';


initializeTestEnvironment();


const runTestCreateCategory = async () => {


    try {

        await configureCategoriesDependencies();

        const dataCreateCategory : CategoryProductDto = {

            idCategory : "Test",
            label : "Test",
            name : "Test",
            slug : "Test",
            description : "Test",
            isActive : true,
            isVisible : false
        };
      
        const productService = container.resolve(ProductService);

        const result = await productService.createCategory(dataCreateCategory);

        console.log("📄 Categoria creada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateCategory().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});