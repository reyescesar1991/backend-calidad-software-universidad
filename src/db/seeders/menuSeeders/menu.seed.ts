import { resolve } from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PermissionModel, RouteModel, SubrouteModel } from '../../models';
import { SubrouteDto, subrouteSchemaZod } from '../../../validations';


// Carga las variables de entorno explícitamente para el seeder
// Process.cwd carga la ruta /backend-calidad y luego la une con .env para traer el URI
dotenv.config({ path: resolve(process.cwd(), ".env") });

// Ahora usa la variable de entorno, con un fallback para desarrollo local
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}


mongoose.set('bufferTimeoutMS', 30000);


const seedSubroutes = async () => {

  try {

    if (mongoose.connection.readyState !== 1) {

      console.log("Conectando a la base de datos...");
      await mongoose.connect(CONNECTION_STRING);
      console.log('Conexión a la base de datos establecida correctamente');
    }

    //Obtenemos las rutas en bases de datos
    const existingRoutes = await RouteModel.find({});
    if(existingRoutes.length === 0){
      throw new Error("❌ No hay permisos en la base de datos. Ejecuta primero el seed de routes.");
    }

    // console.log("Rutas existentes: ", existingRoutes);
    

    //Obtenemos los permisos en base de datos
    const existingPermissions = await PermissionModel.find({});
    if (existingPermissions.length === 0) {
      throw new Error("❌ No hay permisos en la base de datos. Ejecuta primero el seed de permisos.");
    }

    const subroutesToSeed = [

      { id: 'products-registry', name: 'Registrar producto', path: '/dashBoard/productos/registrar-producto', active: false, permissionKey: 'registrar_producto', mainRoute: 'products', parentId: {}},
      { id: 'products-modify', name: 'Modificar producto', path: '/dashBoard/productos/modificar-producto', active: false, permissionKey: 'modificar_producto', mainRoute: 'products', parentId: {} },
      { id: 'products-list', name: 'Listado de productos', path: '/dashBoard/productos/lista-productos', active: false, permissionKey: 'ver_listar_productos', mainRoute: 'products', parentId: {} },
      { id: 'products-search', name: 'Buscar producto', path: '/dashBoard/productos/buscar-producto', active: false, permissionKey: 'buscar_producto', mainRoute: 'products', parentId: {} },

      { id: 'inventory-add', name: 'Agregar inventario', path: '/dashBoard/inventario/agregar-inventario', active: false, permissionKey: 'agregar_inventario', mainRoute: 'inventory-management', parentId: {}},
      { id: 'inventory-sales', name: 'Registrar venta', path: '/dashBoard/inventario/registrar-venta', active: false, permissionKey: 'registrar_venta', mainRoute: 'inventory-management', parentId: {} },
      { id: 'inventory-adjust', name: 'Ajustar producto', path: '/dashBoard/inventario/ajustar-producto', active: false, permissionKey: 'ajustar_producto', mainRoute: 'inventory-management', parentId: {} },

      { id: 'report-general', name: 'Estado general', path: '/dashBoard/reportes/reporte-general', active: false, permissionKey: 'reporte_estado_general', mainRoute: 'general-reports', parentId: {}},
      { id: 'report-low-stock', name: 'Bajo stock', path: '/dashBoard/reportes/reporte-bajo-stock', active: false, permissionKey: 'reporte_bajo_stock', mainRoute: 'general-reports', parentId: {} },
      { id: 'report-total-stock', name: 'Valor total inventario', path: '/dashBoard/reportes/reporte-total-stock', active: false, permissionKey: 'reporte_valor_total_inventario', mainRoute: 'general-reports', parentId: {} },

      { id: 'users-create', name: 'Crear usuario', path: '/dashBoard/usuarios/crear-usuario', active: false, permissionKey: 'crear_usuario', mainRoute: 'users', parentId: {} },
      { id: 'users-update', name: 'Modificar usuario', path: '/dashBoard/usuarios/modificar-usuario', active: false, permissionKey: 'modificar_usuario', mainRoute: 'users', parentId: {} },
      { id: 'users-list', name: 'Listar usuarios', path: '/dashBoard/usuarios/listar-usuarios', active: false, permissionKey: 'listar_usuarios', mainRoute: 'users', parentId: {} },
    ];

    const subroutesWithParent = subroutesToSeed.map((subroute) => {

      const parentRoute = existingRoutes.find((route) => route.id === subroute.mainRoute);
      if(!parentRoute){

        throw new Error(`❌ Ruta padre "${subroute.mainRoute}" no encontrada para subruta "${subroute.id}"`);
      }

      return {

        ...subroute,
        parentId : parentRoute._id,
      }
      
    })

    // console.log("Subrutas ya configuradas: ",subroutesWithParent);
    

    const requiredPermissions = subroutesWithParent.map(s => s.permissionKey);
    const missingPermissions = requiredPermissions.filter(
      p => !existingPermissions.some(ep => ep.permission === p)
    );

    if (missingPermissions.length > 0) {
      throw new Error(`❌ Permisos no encontrados: ${missingPermissions.join(", ")}`);
    }

    const validSubroutes: SubrouteDto[] = [];
    const invalidSubroutes: any[] = [];

    for (const subroute of subroutesWithParent) {

      try {
        const validateSubroute = subrouteSchemaZod.parse(subroute) as SubrouteDto;
        validSubroutes.push(validateSubroute);
      } catch (error) {
        console.error('Error de validación en el seeder:', error.issues);
        invalidSubroutes.push(subroute);
      }

    }    

    if (invalidSubroutes.length > 0) {
      console.warn('Los siguientes subrutas no pasaron la validación y no se insertarán:', invalidSubroutes);
    }

    if (validSubroutes.length > 0) {

      try {
        const count = await SubrouteModel.countDocuments();
        console.log(`Encontrados ${count} subrutas existentes`);

        const deleteResult = await SubrouteModel.deleteMany({});
        console.log(`Eliminados ${deleteResult.deletedCount} subrutas existentes`);

        console.log("Routes validas con el Subroute DTO: ", validSubroutes);

        const insertResult = await SubrouteModel.insertMany(validSubroutes, { ordered: false });
        console.log(`Insertados ${insertResult.length} subrutas correctamente`);

      } catch (error) {
        console.error('Error al insertar subrutas en la base de datos:', error);
      }
    } else {

      console.log("No hay subrutas válidas para insertar");
    }

  } catch (error) {

    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {

    await mongoose.disconnect();
  }
}

seedSubroutes()
  .then(() => {

    console.log('Proceso de seed completo');
  })
  .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
  })