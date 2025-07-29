import { AppError } from "../generals/general.exceptions";

export class LocationDataUserNotExistsError extends AppError{
    code = 3000;
    constructor(message : string = "El usuario no tiene un registro de locacion en la base de datos"){

        super(message);
        this.name = "LocationDataUserNotExistsError"
        
    }
}