import { AppError, UnexpectedError } from "../generals/general.exceptions";

export function handleError(error : Error){


    if(error instanceof AppError){

        throw error;
    }
    else{

        throw new UnexpectedError(error);
    }
}