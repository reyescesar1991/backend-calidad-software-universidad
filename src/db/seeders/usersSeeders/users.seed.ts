import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { IUsersType } from '../../../core/types';
import { StatusUserEnum } from '../../../core/enums';
import { UserDto, userSchemaZod } from '../../../validations';
import { UserModel } from '../../models';


dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}

const seedUsers = async () => {


    try {


        if (mongoose.connection.readyState !== 1) {

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const usersToSeed: Array<IUsersType> = [
            {
                idUser: "USER0011",
                rol: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b1d"), // ID aleatorio para el rol
                name: "Ricardo",
                lastName: "Pérez",
                codeCountry: "58",
                phoneNumber: "04121234567",
                email: "ricardo.perez@gmail.com",
                password: "Contraseña.01",
                username: "rperez",
                status: StatusUserEnum.ACTIVE,
                hasTwoFactor: true,
                lastLogin: "2025-04-04T10:00:00Z",
                department: new mongoose.Types.ObjectId("67eead413bf36442a108d304"), // ID aleatorio para el departamento
                roleConfig: new mongoose.Types.ObjectId("67f035b43e3bb51804f182a1"), // ID aleatorio para la configuración del rol
                passwordHistory: ["oldPasswordHash1", "previousPasswordHash"],
            },
            {
                idUser: "USER0022",
                rol: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b1e"), // Otro ID aleatorio para el rol
                name: "Mariana",
                lastName: "Gómez",
                codeCountry: "58",
                phoneNumber: "04149876543",
                email: "mariana.gomez@gmail.com",
                password: "Contraseña.02",
                username: "mgomez",
                status: StatusUserEnum.PENDING,
                hasTwoFactor: false,
                department: new mongoose.Types.ObjectId("67eead413bf36442a108d301"), // Otro ID aleatorio para el departamento
                roleConfig: new mongoose.Types.ObjectId("67f035b43e3bb51804f182a2"), // Otro ID aleatorio para la configuración del rol
            },
            {
                idUser: "USER0033",
                rol: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b1f"),
                name: "José",
                lastName: "Ramírez",
                codeCountry: "58",
                phoneNumber: "04245551212",
                email: "jose.ramirez@gmail.com",
                password: "Contraseña.03",
                username: "jramirez",
                status: StatusUserEnum.ACTIVE,
                hasTwoFactor: false,
                lastLogin: "2025-04-03T15:30:00Z",
                department: new mongoose.Types.ObjectId("67eead413bf36442a108d301"),
                roleConfig: new mongoose.Types.ObjectId("67f035b43e3bb51804f182a3"),
                passwordHistory: ["pass123", "securePass"],
            },
            {
                idUser: "USER0044",
                rol: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b20"),
                name: "Isabella",
                lastName: "Fernández",
                codeCountry: "58",
                phoneNumber: "04161119988",
                email: "isabella.fernandez@gmail.com",
                password: "Contraseña.04",
                username: "ifernandez",
                status: StatusUserEnum.ACTIVE,
                hasTwoFactor: true,
                lastLogin: "2025-03-28T09:45:00Z",
                department: new mongoose.Types.ObjectId("67eead413bf36442a108d301"),
                roleConfig: new mongoose.Types.ObjectId("67f035b43e3bb51804f182a4"),
                passwordHistory: ["password", "mypassword"],
            },
        ];

        const validUsers: UserDto[] = [];
        const invalidUsers: any[] = [];

        for (const user of usersToSeed) {

            try {

                const validUser = userSchemaZod.parse(user);
                validUsers.push(validUser);

            } catch (error) {

                console.error('Error de validación en el seeder:', error.issues);
                invalidUsers.push(user);
            }
        }

        if (invalidUsers.length > 0) {

            console.warn('Los siguientes factores no pasaron la validación y no se insertarán:', invalidUsers);
        }

        if (validUsers.length > 0) {

            try {

                const count = await UserModel.countDocuments({});
                console.log(`Encontrados ${count} usuarios existentes`);

                const deleteResult = await UserModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} usuarios existentes`);

                const insertResult = await UserModel.insertMany(validUsers);
                console.log(`Insertados ${insertResult.length} usuarios correctamente`);

            } catch (error) {
                console.error('Error al insertar usuarios en la base de datos:', error);
            }
        }
        else {

            console.log("No hay usuarios válidos para insertar");
        }

    } catch (error) {
        console.error('Error durante el proceso de seed:', error);
    } finally {

        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }

}

seedUsers().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {

        console.error('Error durante el proceso de seed:', error);
    })