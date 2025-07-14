import { AppError } from "../generals/general.exceptions";

export class ProductNotFoundError extends AppError{
    code = 2800;
    constructor(message : string = "El producto no fue encontrado, intente nuevamente con un ID valido"){

        super(message);
        this.name = "ProductNotFoundError"
        
    }
}

export class ProductsNotFoundInDatabaseError extends AppError{
    code = 2801;
    constructor(message : string = "No se han encontrado productos registrados en la base de datos, intente nuevamente"){

        super(message);
        this.name = "ProductsNotFoundInDatabaseError"
        
    }
}

export class ProductAlreadyExistsError extends AppError{
    code = 2802;
    constructor(message : string = "El producto ya existe en la base de datos, intente nuevamente con un ID valido y diferente"){

        super(message);
        this.name = "ProductAlreadyExistsError"
        
    }
}

export class ProductDataHasUniqueFieldsAlreadyRegisteredError extends AppError{
    code = 2803;
    constructor(message : string = "La data del producto a registrar contiene data ya registrada como unica, intente nuevamente con datos diferentes"){

        super(message);
        this.name = "ProductDataHasUniqueFieldsAlreadyRegisteredError"
        
    }
}

export class ProductQuantitiesValueError extends AppError{
    code = 2804;
    constructor(message : string = "El producto no puede tener un valor cantidad igual a 0 o menor a 0, intente nuevamente con valores validos"){

        super(message);
        this.name = "ProductQuantitiesValueError"
        
    }
}

export class ProductQuantityWarehouseFormatError extends AppError{
    code = 2805;
    constructor(message : string = "La cantidad del producto en el almacen al registrar no puede ser menor o igual a cero, intente nuevamente con valores validos"){

        super(message);
        this.name = "ProductQuantityWarehouseFormatError"
        
    }
}

export class ProductCustomIdNotMatchError extends AppError{
    code = 2806;
    constructor(message : string = "El custom id obtenido por el usuario no coincide con el ID asignado"){

        super(message);
        this.name = "ProductCustomIdNotMatchError"
        
    }
}