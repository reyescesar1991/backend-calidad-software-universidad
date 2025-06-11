import { AppError, UnexpectedError } from "../generals/general.exceptions";
import jwt from 'jsonwebtoken';

interface MongoDuplicateKeyError extends Error {
    code: number;
    keyPattern?: {
        idUser?: boolean;
        [key: string]: any;
    };
}

export function handleError(error: Error) {

    const mongoErr = error as MongoDuplicateKeyError;

    if (mongoErr.code === 11000 && mongoErr.keyPattern?.idUser) {
        throw new Error('Registro Duplicado');
    }

    // 2. Manejar errores específicos de JWT
    if (error instanceof jwt.JsonWebTokenError) {
        switch (error.message) {
            case 'invalid signature':
                throw new Error('Firma de token inválida. Posible manipulación o clave secreta incorrecta');
            case 'jwt expired':
                throw new Error('Token expirado. Por favor inicie sesión nuevamente');
            case 'jwt malformed':
                throw new Error('Token con formato inválido');
            default:
                throw new Error(`Error de token: ${error.message}`);
        }
    }


    if (error instanceof AppError) {

        throw error;
    }
    else {

        throw new UnexpectedError(error);
    }
}