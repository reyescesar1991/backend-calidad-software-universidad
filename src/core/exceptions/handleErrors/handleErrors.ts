import { AppError, UnexpectedError } from "../generals/general.exceptions";

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


    if (error instanceof AppError) {

        throw error;
    }
    else {

        throw new UnexpectedError(error);
    }
}