import { z } from "zod";
import mongoose from "mongoose";

export const loginDataSchemaZod = z.object({

    username: z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
});


export const accessDataUserSchemaZod = z.object({

    accessToken: z.string(),
});

export const dataRecoverUsernameSchemaZod = z.object({

    idUser: z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
});

export const dataRecoverPasswordSchemaZod = z.object({

    idUser: z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    newPassword : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),

});

export const twoFactorCodeVerificationSchemaZod = z.object({
  // Puede ser email o userId, dependiendo de cómo quieras identificar al usuario en la API.
  // Si la API siempre recibe el email para todos los flujos 2FA, usa 'email'.
  userId: z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
  code: z.string().length(6, "El código debe tener 6 dígitos"),
});


export const secondFactorRequestSchemaZod = z.object({

    userId: z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    email : z.string().email(),
})

//Tipo para el manejo de email y codigo para validar el segundo factor
export type TwoFactorCodeVerificationDto = z.infer<typeof twoFactorCodeVerificationSchemaZod>;

//Request para solicitar el correo de segundo factor
export type SecondFactorRequestDto = z.infer<typeof secondFactorRequestSchemaZod>;

//Data necesaria para poder logearse
export type LoginDataDto = z.infer<typeof loginDataSchemaZod>;

//Data que devuelve el login, es el token
export type AccessDataUserDto = z.infer<typeof accessDataUserSchemaZod>;

//Request necesario para poder hacer la recuperacion de usuario
export type RecoverUsernameDataUserDto = z.infer<typeof dataRecoverUsernameSchemaZod>;

//Request necesario para poder hacer la recuperacion de contraseña
export type RecoverPasswordUserDto = z.infer<typeof dataRecoverPasswordSchemaZod>;