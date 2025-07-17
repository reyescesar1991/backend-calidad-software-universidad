"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectDb_1 = require("../../../core/utils/connectDb");
const models_1 = require("../../models");
const validations_1 = require("../../../validations");
(0, connectDb_1.initializeTestEnvironment)();
const userPermissionSecurity = async () => {
    try {
        const adminRole = await models_1.RoleModel.findOne({ idRole: "04" }).select("_id").exec();
        if (!adminRole)
            throw new Error("Rol administrador no encontrado");
        const users = await models_1.UserModel.find({ "rol": adminRole })
            .populate({
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
            const configPermissionsSecurity = {
                idUser: user.idUser,
                idRol: user.rol.idRole,
                customPermissionsSecurity: user.rol.permissionsSecurity.map((perm) => ({
                    permissionSecurityId: perm._id,
                    can: true,
                    permissionKey: perm.permission,
                }))
            };
            return configPermissionsSecurity;
        });
        console.log(userPermissionsSecurity);
        const validUserPermissionsSecurity = [];
        const invalidUserPermissionsSecurity = [];
        for (const userPermissionSecurity of userPermissionsSecurity) {
            try {
                const validUserPermissionSecurity = validations_1.userPermissionSecuritySchemaZod.parse(userPermissionSecurity);
                validUserPermissionsSecurity.push(validUserPermissionSecurity);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidUserPermissionsSecurity.push(userPermissionSecurity);
            }
        }
        if (invalidUserPermissionsSecurity.length > 0) {
            console.warn('Los siguientes usuarios-permisos no pasaron la validación y no se insertarán:', invalidUserPermissionsSecurity);
        }
        if (validUserPermissionsSecurity.length > 0) {
            try {
                const count = await models_1.UserPermissionSecurityModel.countDocuments({});
                console.log(`Encontrados ${count} usuarios-permisos-seguridad existentes`);
                const deleteResult = await models_1.UserPermissionSecurityModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} usuarios-permisos-seguridad existentes`);
                const insertResult = await models_1.UserPermissionSecurityModel.insertMany(validUserPermissionsSecurity);
                console.log(`Insertados ${insertResult.length} usuarios-permisos-seguridad correctamente`);
            }
            catch (error) {
                console.error('Error al insertar usuarios-permisos-seguridad en la base de datos:', error);
            }
        }
        else {
            console.log("No hay usuarios-permisos-seguridad válidos para insertar");
        }
    }
    catch (error) {
        console.error('Error durante el proceso de seed:', error);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
userPermissionSecurity().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=userPermissionSecurity.seed.js.map