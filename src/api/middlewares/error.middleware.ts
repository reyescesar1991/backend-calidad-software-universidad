import { NextFunction, Request, Response } from 'express';
import { logger } from '../../core/logger';

export const errorHandler = (

    err : Error,
    req : Request,
    res : Response,
    next : NextFunction
) => {

    logger.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'});
};