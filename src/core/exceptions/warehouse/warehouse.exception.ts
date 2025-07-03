import { AppError } from "../generals/general.exceptions";

export class WarehouseNotFoundError extends AppError{
    code = 2400;
    constructor(message : string = "El ID no corresponde con ningun almacen, intente nuevamente con un ID valido"){

        super(message);
        this.name = "WarehouseNotFoundError"
        
    }
}

export class WarehouseCustomIdAlreadyExistsError extends AppError{
    code = 2401;
    constructor(message : string = "El ID ya esta asignado a otro almacen, intente nuevamente con un ID valido"){

        super(message);
        this.name = "WarehouseCustomIdAlreadyExistsError"
        
    }
}

export class CurrentCapacityExceedsCapacityWarehouseError extends AppError{
    code = 2402;
    constructor(message : string = "La capacidad actual del almacen superaria la capacidad base del almacen, agregue menos unidades"){

        super(message);
        this.name = "CurrentCapacityExceedsCapacityWarehouseError"
        
    }
}

export class WarehouseIsAlreadyInactiveError extends AppError{
    code = 2403;
    constructor(message : string = "El almacen se encuentra inactivo actualmente"){

        super(message);
        this.name = "WarehouseIsAlreadyInactiveError"
        
    }
}

export class WarehouseIsAlreadyActiveError extends AppError{
    code = 2404;
    constructor(message : string = "El almacen se encuentra activo actualmente"){

        super(message);
        this.name = "WarehouseIsAlreadyActiveError"
        
    }
}

export class AddBoxesFormatError extends AppError{
    code = 2405;
    constructor(message : string = "El número de cajas a almacenar deben ser mayor a cero"){

        super(message);
        this.name = "AddBoxesFormatError"
        
    }
}

export class DecreaseBoxesFormatError extends AppError{
    code = 2406;
    constructor(message : string = "El número de cajas a retirar deben ser mayor a cero"){

        super(message);
        this.name = "DecreaseBoxesFormatError"
        
    }
}