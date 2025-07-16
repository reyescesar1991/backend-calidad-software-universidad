import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../../core/utils/connectDb';
import { objectIdSchema, ProductDto } from '../../../validations';
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


const runTestCreateProduct = async () => {


    try {

        await configureCategoriesDependencies();
        await configureProductDependencies();
        await configureSuppliersDependencies();
        await configurePaymentTermsDependencies();
        await configureDependenciesHeadquarters();
        await configureDependenciesDepartments();
        await configureWarehouseDependencies();

        const productData: ProductDto = {

            idProduct: "PROD00007",
            name: "Test Product",
            description: "Test Product",
            sku: "OTR-TestProduct-12345678",
            barcode: "00010923",
            categoryId: objectIdSchema.parse("686c291869c01867f3725034"),
            supplierId: objectIdSchema.parse("686bdd723f3c8e2924f21135"),
            brand: "Test Brand",
            purchasePrice: .99,
            sellingPrice: 2.69,
            currency: CurrencyEnum.DOLARES,
            minimumStockLevel: 5,
            maximumStockLevel: 300,
            unitOfMeasure: UnitMeasureEnum.PALLET,
            imageUrl: "test/Url",
            updatedAt: new Date(Date.now()),
            isActive: true,
            notes: "test notes",
        }

        const productService = container.resolve(ProductService);

        const result = await productService.createProduct(productData);

        console.log("📄 Productos creado:", result);

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);

    } finally {

        disconnectMongo();
    }
}

runTestCreateProduct().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });