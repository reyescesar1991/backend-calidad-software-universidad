import { IUserPermission } from "../../../core/types";
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { UserPermissionDto, userPermissionSchemaZod } from "../../../validations";
import { UserModel, UserPermissionModel } from "../../models";
import mongoose from "mongoose";

initializeTestEnvironment();


const userPermissionSeed = async () => {

    try {


        const users = await UserModel.find({})
            .populate<{ 
                rol: { 
                    permissions: { _id: mongoose.Types.ObjectId; permission: string }[];
                    _id: mongoose.Types.ObjectId;
                } 
            }>({
                path: "rol",
                populate: {
                    path: "permissions",
                    select: "_id permission", // Solo carga el campo 'name'
                },
            })
            .exec();


        console.log(users);
        


        const userPermissions = users.map((user) => {
            const userWithPermission: IUserPermission = {
                idUser: user.idUser,
                roleId: user.rol._id,
                customPermissions: user.rol.permissions.map((perm) => ({ // 👈 Convierte en array
                    permissionId: perm._id,
                    can: true, 
                    permissionKey : perm.permission
                })),
            };
            return userWithPermission;
        });

        // userPermissions.forEach((user) => {
        //     console.log(JSON.stringify(user, null, 2));
        // });

        const validUserPermissions : UserPermissionDto[] = [];
        const invalidUserPermissions : any[] = [];


        for(const userPermission of userPermissions){

            try {
                
                const validUserPermission = userPermissionSchemaZod.parse(userPermission);
                validUserPermissions.push(validUserPermission);

            } catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidUserPermissions.push(userPermission);
            }
        }

        if(invalidUserPermissions.length > 0){

            console.warn('Los siguientes usuarios-permisos no pasaron la validación y no se insertarán:', invalidUserPermissions);
        }

        if(validUserPermissions.length > 0){

            try {

                const count = await UserPermissionModel.countDocuments({});
                console.log(`Encontrados ${count} usuarios-permisos existentes`);

                const deleteResult = await UserPermissionModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} usuarios-permisos existentes`);

                const insertResult = await UserPermissionModel.insertMany(validUserPermissions);
                console.log(`Insertados ${insertResult.length} usuarios-permisos correctamente`);
                
            } catch (error) {
                console.error('Error al insertar usuarios-permisos en la base de datos:', error);
            }
            
        }
        else{

            console.log("No hay usuarios-permisos válidos para insertar");
        }

    } catch (error) {

        console.error('Error durante el proceso de seed:', error);

    } finally {

        disconnectMongo();
    }
};

userPermissionSeed().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {

        console.error('Error durante el proceso de seed:', error);
    })