import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { objectIdSchema, UpdateProductDto } from '../../../validations';
import { container } from 'tsyringe';
import { ProductService } from '../../../services/productService';
import { configureCategoriesDependencies } from '../../../core/config/dependenciesCategories/dependencies';
import { configureProductDependencies } from '../../../core/config/dependenciesProducts/dependencies';
import { configureSuppliersDependencies } from '../../../core/config/dependenciesSuppliers/dependencies';
import { configurePaymentTermsDependencies } from '../../../core/config/dependenciesPaymentTerms/dependencies';
import { configureDependenciesHeadquarters } from '../../../core/config/dependenciesHeadquarters/dependencies';
import { configureDependenciesDepartments } from '../../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../../core/config/dependenciesWarehouses/dependencies';
import { CurrencyEnum, UnitMeasureEnum } from '../../../core/enums';


initializeTestEnvironment();


const runTestUpdateProduct = async () => {


    try {

        await configureCategoriesDependencies();
        await configureProductDependencies();
        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();
        await configureDependenciesHeadquarters();
        await configureDependenciesDepartments();
        await configureWarehouseDependencies();

        const productId = objectIdSchema.parse("6876af6793cb0ae480ef33a2");

        const productData: UpdateProductDto = {

            name: "Test Product update",
            // description: "Test Product",
            categoryId: objectIdSchema.parse("67f53221794205960e288b73"),
            supplierId: objectIdSchema.parse("67e701d40d06e2ab18b4172d"),
            // brand: "Test Brand",
            // purchasePrice: .99,
            // sellingPrice: 2.69,
            // currency: CurrencyEnum.DOLARES,
            // minimumStockLevel: 5,
            // maximumStockLevel: 300,
            // unitOfMeasure: UnitMeasureEnum.PALLET,
            // imageUrl: "test/Url",
            // notes: "test notes",
        }

        const productService = container.resolve(ProductService);

        const result = await productService.updateProduct(productId, productData);

        console.log("📄 Productos actualizado:", result);

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);

    } finally {

        disconnectMongo();
    }
}

runTestUpdateProduct().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });