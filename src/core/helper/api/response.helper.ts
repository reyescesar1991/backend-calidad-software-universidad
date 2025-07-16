// src/utils/response.helper.ts
import { Response } from 'express';

// Define la interfaz para una respuesta API estándar (éxito o error)
interface StandardApiResponse<T> {
    message?: string;
    code?: number | string;
    data?: T;
    // Para errores, podrías añadir un campo 'error' o 'details'
    error?: string; // Mensaje de error general
    details?: any;  // Detalles específicos del error (ej. errores de validación de Zod)
}

/**
 * Sends a standardized success API response.
 * @param res Express Response object.
 * @param statusCode HTTP status code (e.g., 200, 201).
 * @param data The actual payload to send.
 * @param message An optional human-readable message.
 * @param code An optional internal code.
 */
export const sendSuccessResponse = <T>(
    res: Response,
    statusCode: number,
    data?: T,
    message?: string,
    code?: number | string
): void => {
    const responseBody: StandardApiResponse<T> = {
        message: message || 'Operacion exitosa.',
        code: code || 1000,
        data: data,
    };
    res.status(statusCode).json(responseBody);
};

// You might also create a helper for errors, but typically
// a global error handling middleware is more effective for errors.
// However, for explicit business logic errors that are not exceptions,
// you could use a similar helper.


/**
 * Envía una respuesta API estandarizada de error.
 * Útil para errores de lógica de negocio controlados que no son excepciones no manejadas.
 * Para excepciones no manejadas, un middleware global es preferible.
 * @param res Express Response object.
 * @param statusCode Código de estado HTTP (ej., 400, 401, 404, 409).
 * @param error El mensaje de error principal.
 * @param details Detalles adicionales del error (ej. validación).
 * @param code Un código interno de error.
 */
export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    error: string,
    details?: any,
    code?: string
): void => {
    const responseBody: StandardApiResponse<null> = { // Data es null para errores
        message: error || 'Ha ocurrido un error.',
        code: code || 'ERROR',
        error: error, // Duplicamos para claridad si el frontend prefiere 'error'
        details: details,
    };
    res.status(statusCode).json(responseBody);
};