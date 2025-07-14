import { AppError } from "../generals/general.exceptions";

export class ProductStockNotFoundError extends AppError{
    code = 2900;
    constructor(message : string = "No se encontro el producto registrado en los almacenes"){

        super(message);
        this.name = "ProductStockNotFoundError"
        
    }
}

export class ProductStockAlreadyExistsError extends AppError{
    code = 2901;
    constructor(message : string = "El producto ya se encuentra registrado en ese almacen, intente registrarlo en otro almacen"){

        super(message);
        this.name = "ProductStockAlreadyExistsError"
        
    }
}

export class ProductStockQuantityError extends AppError{
    code = 2902;
    constructor(message : string = "La cantidad a registrar en el stock del producto no puede ser menor a cero"){

        super(message);
        this.name = "ProductStockQuantityError"
        
    }
}

export class ProductsInStockNotFoundError extends AppError{
    code = 2903;
    constructor(message : string = "No existen productos en stock registrados en la base de datos"){

        super(message);
        this.name = "ProductsInStockNotFoundError"
        
    }
}

export class ProductStockNotExistsError extends AppError{
    code = 2904;
    constructor(message : string = "No existe stock para esa combinación de producto y almacen"){

        super(message);
        this.name = "ProductStockNotExistsError"
        
    }
}

export class ProductStockAlreadyActiveError extends AppError{
    code = 2905;
    constructor(message : string = "El stock del producto en ese almacen ya se encuentra activo"){

        super(message);
        this.name = "ProductStockAlreadyActiveError"
        
    }
}

export class ProductStockAlreadyInactiveError extends AppError{
    code = 2906;
    constructor(message : string = "El stock del producto en ese almacen ya se encuentra inactivo"){

        super(message);
        this.name = "ProductStockAlreadyInactiveError"
        
    }
}