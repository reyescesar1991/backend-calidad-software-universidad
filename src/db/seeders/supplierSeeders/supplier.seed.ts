import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { ISupplierType } from '../../../core/types';
import { SupplierDto, supplierSchemaZod } from '../../../validations';
import { SupplierModel } from '../../models';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}


mongoose.set('bufferTimeoutMS', 30000);


const seedSuppliers = async () => {

    console.log('Proceso de seed completo');

    try {

        if (mongoose.connection.readyState !== 1) {

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const suppliersToSeed: Array<ISupplierType> = [

            {
                id: 'SUP-VEN-001',
                name: 'Alimentos La Llanura C.A.',
                tradeName: 'La Llanura',
                contactPerson: 'Carlos Pérez',
                phoneNumber: '02129876543',
                email: 'ventas@lallanura.com.ve',
                address: 'Av. Principal de Los Ruices, Edif. 2000, Piso 5, Ofic. 5B',
                city: 'Caracas',
                state: 'Distrito Capital',
                zipCode: '1071',
                country: 'Venezuela',
                taxId: 'J-12345678-9',
                businessRegistrationNumber: 'Tomo 123-A, Folio 456',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea487c"),
                isActive: true,
                notes: 'Proveedor principal de lácteos.',
            },
            {
                id: 'SUP-VEN-002',
                name: 'Distribuidora El Sol, S.R.L.',
                tradeName: 'El Sol',
                contactPerson: 'Ana Rodríguez',
                phoneNumber: '02418765432',
                email: 'compras@elsol.com.ve',
                address: 'Calle 10, Zona Industrial Norte, Galpón 5',
                city: 'Valencia',
                state: 'Carabobo',
                zipCode: '2002',
                country: 'Venezuela',
                taxId: 'J-98765432-1',
                businessRegistrationNumber: 'Registro Mercantil Segundo, Nro. 789',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea487d"),
                isActive: true,
                notes: 'Proveedor de frutas y verduras de temporada.',
            },
            {
                id: 'SUP-USA-003',
                name: 'Global Seafood Imports Inc.',
                tradeName: 'Global Seafood',
                contactPerson: 'John Smith',
                phoneNumber: '+1-555-123-4567',
                email: 'sales@globalseafood.com',
                address: '123 Main Street, Suite 100',
                city: 'Miami',
                state: 'Florida',
                zipCode: '33101',
                country: 'USA',
                taxId: '12-3456789',
                businessRegistrationNumber: 'N/A',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea487c"),
                isActive: true,
                notes: 'Importador de mariscos congelados.',
            },
            {
                id: 'SUP-COL-004',
                name: 'Carnes Premium Colombianas S.A.S.',
                tradeName: 'Carnes Premium',
                contactPerson: 'Laura Vargas',
                phoneNumber: '+57-300-987-6543',
                email: 'info@carnespremium.co',
                address: 'Carrera 43A # 1-50, Oficina 201',
                city: 'Medellín',
                state: 'Antioquia',
                zipCode: '050021',
                country: 'Colombia',
                taxId: '890.987.654-3',
                businessRegistrationNumber: '00123456',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea487f"),
                isActive: true,
                notes: 'Proveedor de cortes de carne de alta calidad.',
            },
            {
                id: 'SUP-VEN-005',
                name: 'Bebidas Refrescantes del Caribe C.A.',
                tradeName: 'Refrescaribe',
                contactPerson: 'María González',
                phoneNumber: '02127654321',
                email: 'pedidos@refrescaribe.com.ve',
                address: 'Urb. La Trinidad, Calle 5, Edif. Agua Clara, Local 3',
                city: 'Caracas',
                state: 'Distrito Capital',
                zipCode: '1080',
                country: 'Venezuela',
                taxId: 'J-87654321-0',
                businessRegistrationNumber: 'Tomo 456-B, Folio 789',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea4880"),
                isActive: true,
                notes: 'Distribuidor de bebidas gaseosas y jugos.',
            },
            {
                id: 'SUP-ESP-006',
                name: 'Panadería Artesanal Española SL',
                tradeName: 'Panadería España',
                contactPerson: 'Antonio López',
                phoneNumber: '+34-91-123-4567',
                email: 'pedidos@panaderiaespana.es',
                address: 'Calle Mayor, 15',
                city: 'Madrid',
                state: 'Madrid',
                zipCode: '28013',
                country: 'España',
                taxId: 'B12345678',
                businessRegistrationNumber: 'Tomo 1234, Folio 56, Sección 1',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea487c"),
                isActive: true,
                notes: 'Proveedor de productos de panadería artesanal.',
            },
            {
                id: 'SUP-VEN-007',
                name: 'Productos Congelados Andinos C.A.',
                tradeName: 'FrioAndino',
                contactPerson: 'Pedro Ramírez',
                phoneNumber: '02742639876',
                email: 'ventas@frioandino.com.ve',
                address: 'Av. Don Tulio Febres Cordero, Sector La Hechicera, Galpón 12',
                city: 'Mérida',
                state: 'Mérida',
                zipCode: '5101',
                country: 'Venezuela',
                taxId: 'J-76543210-9',
                businessRegistrationNumber: 'Registro Mercantil Primero, Nro. 321',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea4881"),
                isActive: true,
                notes: 'Especialistas en alimentos congelados.',
            },
            {
                id: 'SUP-CHN-008',
                name: 'Clean Solutions Trading Co., Ltd.',
                tradeName: 'Clean Solutions',
                contactPerson: 'Li Wei',
                phoneNumber: '+86-21-98765432',
                email: 'sales@cleansolutions.cn',
                address: 'No. 88, Century Avenue, Pudong New Area',
                city: 'Shanghai',
                state: 'Shanghai',
                zipCode: '200120',
                country: 'China',
                taxId: '91310115MA1K02XX69',
                businessRegistrationNumber: '123456789012345',
                paymentTerm: new mongoose.Types.ObjectId("67e59b7a75973ad506ea487c"),
                isActive: true,
                notes: 'Proveedor de productos de limpieza industrial.',
            },
        ]

        const validSuppliers: SupplierDto[] = [];
        const invalidSuppliers: any[] = [];

        for (const supplier of suppliersToSeed) {

            try {

                const validSupplier = supplierSchemaZod.parse(supplier);
                validSuppliers.push(validSupplier);

            } catch (error) {

                console.error('Error de validación en el seeder:', error.issues);
                invalidSuppliers.push(supplier);
            }
        }

        if (invalidSuppliers.length > 0) {
            console.warn('Los siguientes proveedores no pasaron la validación y no se insertarán:', invalidSuppliers);
        }

        if (validSuppliers.length > 0) {

            try {

                const count = await SupplierModel.countDocuments();
                console.log(`Encontrados ${count} proveedores existentes`);

                const deleteResult = await SupplierModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} proveedores existentes`);

                const insertResult = await SupplierModel.insertMany(validSuppliers);
                console.log(`Insertados ${insertResult.length} proveedores correctamente`);

            } catch (error) {
                console.error('Error al insertar proveedores en la base de datos:', error);
            }
        }
        else {

            console.log("No hay proveedores válidos para insertar");
        }

        //EJEMPLO DE CONSULTA
        
        // const populatedPaymentTerms = await SupplierModel.find({})
        //     .populate("paymentTerm") // Pobla los detalles del término de pago
        //     .select("paymentTerm -_id") // Proyecta solo el campo poblado
        //     .then(suppliers => suppliers.map(s => s.paymentTerm));

        // console.log(populatedPaymentTerms);



    } catch (error) {
        console.error('Error durante el proceso de seed:', error);
    } finally {

        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }
}

seedSuppliers().then(() => {
    console.log('Proceso de seed completo');

})
    .catch((error) => {

        console.error('Error durante el proceso de seed:', error);
    })