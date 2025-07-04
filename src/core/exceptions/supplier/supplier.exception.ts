import { AppError } from "../generals/general.exceptions";

export class SupplierNotExistsError extends AppError{
    code = 2600;
    constructor(message : string = "El proveedor con ese ID no existe, intenta nuevamente con un ID valido"){

        super(message);
        this.name = "SupplierNotExistsError"
        
    }
}

export class SupplierAlreadyExistsError extends AppError{
    code = 2601;
    constructor(message : string = "El proveedor ya existe en el sistema, intente con un ID diferente"){

        super(message);
        this.name = "SupplierAlreadyExistsError"
        
    }
}

export class ItHasUniqueDataAndRegisteredError extends AppError{
    code = 2602;
    constructor(message : string = "La data de creacion de proveedor tiene datos ya registrados como unicos, intente registrar con otra data"){

        super(message);
        this.name = "ItHasUniqueDataAndRegisteredError"
        
    }
}

export class SupplierIsAlreadyActiveError extends AppError{
    code = 2603;
    constructor(message : string = "El proveedor ya se encuentra activo"){

        super(message);
        this.name = "SupplierIsAlreadyActiveError"
        
    }
}

export class SupplierIsAlreadyInactiveError extends AppError{
    code = 2604;
    constructor(message : string = "El proveedor ya se encuentra inactivo"){

        super(message);
        this.name = "SupplierIsAlreadyInactiveError"
        
    }
}

export class SuppliersNotExistsError extends AppError{
    code = 2604;
    constructor(message : string = "No se encontraron proveedores con esos terminos de busqueda o no estan activos en el sistema"){

        super(message);
        this.name = "SuppliersNotExistsError"
        
    }
}