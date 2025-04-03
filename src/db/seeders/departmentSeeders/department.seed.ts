import * as dotenv from 'dotenv';
import {resolve} from 'path';
import mongoose from 'mongoose';
import { IDepartmentType } from '../../../core/types';
import { CompanyDepartmentEnum } from '../../../core/enums';
import { DepartmentDto, departmentSchemaZod } from '../../../validations';
import { DepartmentModel } from '../../models';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);

if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}

const seedDepartment = async () => {


    try {
        

        if(mongoose.connection.readyState !== 1){

            console.log("Conectando a la base de datos...");
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const departmentToSeed : Array<IDepartmentType> = [

            {
                idDepartment : 'ADM01' , 
                label : CompanyDepartmentEnum.ADMINISTRACION, 
                name: CompanyDepartmentEnum.ADMINISTRACION, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName : "CAR-HQ-01"
            },
            {
                idDepartment : 'CMP01' , 
                label : CompanyDepartmentEnum.COMPRAS, 
                name: CompanyDepartmentEnum.COMPRAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName : "CAR-HQ-01"
            },
            {
                idDepartment : 'VNT01' , 
                label : CompanyDepartmentEnum.VENTAS, 
                name: CompanyDepartmentEnum.VENTAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName : "CAR-HQ-01"
            },
            {
                idDepartment : 'ALM01' , 
                label : CompanyDepartmentEnum.ALMACEN, 
                name: CompanyDepartmentEnum.ALMACEN, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName : "CAR-HQ-01"
            },
            {
                idDepartment : 'RRHH01' , 
                label : CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                name: CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName : "CAR-HQ-01"
            },



            {
                idDepartment : 'ADM02' , 
                label : CompanyDepartmentEnum.ADMINISTRACION, 
                name: CompanyDepartmentEnum.ADMINISTRACION, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName : "VAL-BR-02"
            },
            {
                idDepartment : 'CMP02' , 
                label : CompanyDepartmentEnum.COMPRAS, 
                name: CompanyDepartmentEnum.COMPRAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName : "VAL-BR-02"
            },
            {
                idDepartment : 'VNT02' , 
                label : CompanyDepartmentEnum.VENTAS, 
                name: CompanyDepartmentEnum.VENTAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName : "VAL-BR-02"
            },
            {
                idDepartment : 'ALM02' , 
                label : CompanyDepartmentEnum.ALMACEN, 
                name: CompanyDepartmentEnum.ALMACEN, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName : "VAL-BR-02"
            },
            {
                idDepartment : 'RRHH02' , 
                label : CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                name: CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName : "VAL-BR-02",
                isActive : false,
            },


            {
                idDepartment : 'ADM03' , 
                label : CompanyDepartmentEnum.ADMINISTRACION, 
                name: CompanyDepartmentEnum.ADMINISTRACION, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName : "MAR-AG-03"
            },
            {
                idDepartment : 'CMP03' , 
                label : CompanyDepartmentEnum.COMPRAS, 
                name: CompanyDepartmentEnum.COMPRAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName : "MAR-AG-03"
            },
            {
                idDepartment : 'VNT03' , 
                label : CompanyDepartmentEnum.VENTAS, 
                name: CompanyDepartmentEnum.VENTAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName : "MAR-AG-03"
            },
            {
                idDepartment : 'ALM03' , 
                label : CompanyDepartmentEnum.ALMACEN, 
                name: CompanyDepartmentEnum.ALMACEN, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName : "MAR-AG-03"
            },
            {
                idDepartment : 'RRHH03' , 
                label : CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                name: CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName : "MAR-AG-03",
                isActive : false,
            },



            {
                idDepartment : 'ADM04' , 
                label : CompanyDepartmentEnum.ADMINISTRACION, 
                name: CompanyDepartmentEnum.ADMINISTRACION, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName : "BAR-DP-04"
            },
            {
                idDepartment : 'CMP04' , 
                label : CompanyDepartmentEnum.COMPRAS, 
                name: CompanyDepartmentEnum.COMPRAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName : "BAR-DP-04"
            },
            {
                idDepartment : 'VNT04' , 
                label : CompanyDepartmentEnum.VENTAS, 
                name: CompanyDepartmentEnum.VENTAS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName : "BAR-DP-04"
            },
            {
                idDepartment : 'ALM04' , 
                label : CompanyDepartmentEnum.ALMACEN, 
                name: CompanyDepartmentEnum.ALMACEN, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName : "BAR-DP-04"
            },
            {
                idDepartment : 'RRHH04' , 
                label : CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                name: CompanyDepartmentEnum.RECURSOS_HUMANOS, 
                headquartersId : new mongoose.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName : "BAR-DP-04",
            },

        ]


        const validDepartments : DepartmentDto[] = [];
        const invalidDepartments : any[] = [];

        for(const department of departmentToSeed){

            try {
                
                const validDepartment = departmentSchemaZod.parse(department);
                validDepartments.push(validDepartment);

            } catch (error) {
                
                console.error('Error de validación en el seeder:', error.issues);
                invalidDepartments.push(department);
            }
        }

        if(invalidDepartments.length > 0){

            console.warn('Las siguientes sedes no pasaron la validación y no se insertarán:', invalidDepartments);
        }

        if(validDepartments.length > 0){

            try {
                
                const count = await DepartmentModel.countDocuments({});
                console.log(`Encontrados ${count} departamentos existentes`);

                const deleteResult = await DepartmentModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} departamentos existentes`);

                const insertResult = await DepartmentModel.insertMany(validDepartments);
                console.log(`Insertados ${insertResult.length} departamentos correctamente`);

            } catch (error) {
                console.error('Error al insertar departamentos en la base de datos:', error);
            }
        }
        else{

            console.log("No hay departamentos válidos para insertar");
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    } finally{

        await mongoose.disconnect();
    }
};

seedDepartment().then(() => {
    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
})