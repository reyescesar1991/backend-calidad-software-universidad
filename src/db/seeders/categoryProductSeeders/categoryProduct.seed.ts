import * as dotenv from 'dotenv';
import {resolve} from 'path';
import mongoose from 'mongoose';
import { ICategoryProduct } from '../../../core/types';
import { CategoryProductDto, categoryProductZodSchema } from '../../../validations';
import { CategoryProductModel } from '../../models';
import { CategoryProductEnum } from '../../../core/enums';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);

if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}

mongoose.set('bufferTimeoutMS', 30000);

const seedCategoryProducts = async () => {

    try {
        

        if(mongoose.connection.readyState !== 1){

            console.log("Conectando a la base de datos...");
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }


        const categoriesProductsToSeed : Array<ICategoryProduct> = [

            {idCategory: CategoryProductEnum.FRUTAS , label : 'Frutas', name: 'Frutas', slug : 'frutas'},
            {idCategory: CategoryProductEnum.VERDURAS, label : 'Verduras', name: 'Verduras', slug : 'verduras'},
            {idCategory: CategoryProductEnum.LACTEOS, label : 'Lacteos', name: 'Lacteos', slug: 'lacteos'},
            {idCategory: CategoryProductEnum.CARNES, label : 'Carnes', name: 'Carnes', slug: 'carnes'},
            {idCategory: CategoryProductEnum.PANADERIA, label : 'Panaderia', name: 'Panaderia', slug: 'panaderia'},
            {idCategory: CategoryProductEnum.BEBIDAS, label : 'Bebidas', name: 'Bebidas', slug: 'bebidas'},
            {idCategory: CategoryProductEnum.CONGELADOS, label : 'Congelados', name: 'Congelados', slug: 'congelados'},
            {idCategory: CategoryProductEnum.ENLATADOS, label : 'Enlatados', name: 'Enlatados', slug: 'enlatados'},
            {idCategory: CategoryProductEnum.LIMPIEZA, label : 'Limpieza', name: 'Limpieza', slug: 'limpieza'},
            {idCategory: CategoryProductEnum.OTROS, label: 'Otros', name: 'Otros', slug: 'otros'},
        ]

        const validCategoriesProducts : CategoryProductDto[] = [];
        const invalidCategoriesProducts : any[] = [];

        for(const category of categoriesProductsToSeed){

            try {
                
                const validCategory = categoryProductZodSchema.parse(category) as CategoryProductDto;
                validCategoriesProducts.push(validCategory);

            } catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidCategoriesProducts.push(category);
            }
        }

        console.log(validCategoriesProducts);
        

        if(invalidCategoriesProducts.length > 0){

            console.warn('Las siguientes categorias no pasaron la validación y no se insertarán:', invalidCategoriesProducts);
        }

        if(validCategoriesProducts.length > 0){

            try {
                
                const count = await CategoryProductModel.countDocuments();
                console.log(`Encontradas ${count} categorias existentes`);

                const deleteResult = await CategoryProductModel.deleteMany({});
                console.log(`Eliminadas ${deleteResult.deletedCount} categorias existentes`);

                const insertResult = await CategoryProductModel.insertMany(validCategoriesProducts);
                console.log(`Insertadas ${insertResult.length} categorias correctamente`);

            } catch (error) {
                console.error('Error al insertar categorias en la base de datos:', error);
            }
        }
        else{

            console.log("No hay categorias válidas para insertar");
        }


    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    } finally {

        await mongoose.disconnect();
    }

}

seedCategoryProducts().then(() => {
    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});