import mongoose from "mongoose";
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { RoleModel, UserModel } from "../../models";
import { IUserPermissionSecurity } from "../../../core/types";

initializeTestEnvironment();

const userPermissionSecurity = async () => {


    try {

        const adminRole = await RoleModel.findOne({ idRole: "04" }).select("_id").exec();
        if (!adminRole) throw new Error("Rol administrador no encontrado");

        const users = await UserModel.find({"rol" : adminRole})
        .populate<{

            rol: {
                permissionsSecurity : { _id: mongoose.Types.ObjectId; permission: string}[]
                idRole : string;
            };

        }>({

            path: "rol",
            populate: {

                path: "permissionsSecurity",
                select: "_id permission",
            }
        }).exec();

        users.forEach((user) => {
            console.log("Usuario administrador:", user.idUser);
            console.log("Permisos de seguridad:", user.rol.permissionsSecurity);
        });

        const userPermissionsSecurity = users.map((user) => {

            const configPermissionsSecurity : IUserPermissionSecurity = {

                idUser : user.idUser,
                idRol : user.rol.idRole,
                customPermissionsSecurity : user.rol.permissionsSecurity.map((perm) => ({

                    permissionSecurityId : perm._id,
                    can : true,
                    permissionKey : perm.permission,
                }))
            }
            return configPermissionsSecurity;
        });

        console.log(userPermissionsSecurity);
        

    } catch (error) {

        console.error('Error durante el proceso de seed:', error);

    } finally {

        disconnectMongo();
    }

}

userPermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {

        console.error('Error durante el proceso de seed:', error);
    })