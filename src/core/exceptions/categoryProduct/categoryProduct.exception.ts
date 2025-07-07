import { AppError } from "../generals/general.exceptions";

export class CategoryProductNotFoundError extends AppError{
    code = 2700;
    constructor(message : string = "La categoria no existe, intente con un ID valido"){

        super(message);
        this.name = "CategoryProductNotFoundError"
        
    }
}

export class CategoriesProductNotFoundError extends AppError{
    code = 2701;
    constructor(message : string = "No existen categorias registradas en la base de datos"){

        super(message);
        this.name = "CategoriesProductNotFoundError"
        
    }
}

export class CategoriesProductByLabelNotFoundError extends AppError{
    code = 2702;
    constructor(message : string = "No existen categorias registradas con esas etiquetas en el sistema"){

        super(message);
        this.name = "CategoriesProductByLabelNotFoundError"
        
    }
}

export class CategoryAlreadyExistsError extends AppError{
    code = 2703;
    constructor(message : string = "El id de la categoria debe ser unico, intente con otro nuevamente"){

        super(message);
        this.name = "CategoryAlreadyExistsError"
        
    }
}

export class CategoryProductIsAlreadyActiveError extends AppError{
    code = 2704;
    constructor(message : string = "La categoria de producto ya se encuentra activa"){

        super(message);
        this.name = "CategoryProductIsAlreadyActiveError"
        
    }
}

export class CategoryProductIsAlreadyInactiveError extends AppError{
    code = 2705;
    constructor(message : string = "La categoria de producto ya se encuentra inactiva"){

        super(message);
        this.name = "CategoryProductIsAlreadyInactiveError"
        
    }
}

export class CategoryProductIsAlreadyViewableError extends AppError{
    code = 2706;
    constructor(message : string = "La categoria de producto ya se encuentra visible actualmente para visualizacion"){

        super(message);
        this.name = "CategoryProductIsAlreadyViewableError"
        
    }
}

export class CategoryProductIsAlreadyNotViewableError extends AppError{
    code = 2707;
    constructor(message : string = "La categoria de producto ya no se encuentra visible actualmente para visualizacion"){

        super(message);
        this.name = "CategoryProductIsAlreadyNotViewableError"
        
    }
}