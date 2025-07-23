import { z } from 'zod';
import { userSchemaZod } from '../usersValidators/user.validation';

// Usamos .pick para reutilizar la validación de 'idUser' desde el esquema principal.
// Esto es más mantenible que duplicar la lógica de validación.
export const validateCustomUserIdSchemaZod = userSchemaZod.pick({
    idUser: true,
});

// El DTO se infiere del nuevo esquema.
export type ValidateUserExistsDto = z.infer<typeof validateCustomUserIdSchemaZod>;

