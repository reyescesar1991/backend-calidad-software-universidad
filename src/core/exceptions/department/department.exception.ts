import { AppError } from "../generals/general.exceptions";

export class DepartmentNotFoundError extends AppError{
    code = 1701;
    constructor(message : string = "El departamento no existe, intente con un ID valido"){

        super(message);
        this.name = "DepartmentNotFoundError"
        
    }
}

export class DepartmentsNotFoundByHeadquarterError extends AppError{
    code = 1702;
    constructor(message : string = "No existen departamentos en esa sucursal, intente de nuevo"){

        super(message);
        this.name = "DepartmentsNotFoundByHeadquarterError"
        
    }
}

export class FilterDepartmentError extends AppError{
    code = 1703;
    constructor(message : string = "El filtro de busqueda no es valido, intente ajustar los parárametros"){

        super(message);
        this.name = "FilterDepartmentError"
        
    }
}

export class DepartmentsNotFoundByFilterError extends AppError{
    code = 1704;
    constructor(message : string = "No se encontraron departamentos con esos parámetros, intente con otros"){

        super(message);
        this.name = "DepartmentsNotFoundByFilterError"
        
    }
}

export class DepartmentsNotFoundByDataBaseError extends AppError{
    code = 1705;
    constructor(message : string = "No se encontraron departamentos en la base de datos, agregue un registro"){

        super(message);
        this.name = "DepartmentsNotFoundByDataBaseError"
        
    }
}

export class DepartmentIsAlreadyActiveError extends AppError{
    code = 1706;
    constructor(message : string = "El departamento ya se encuentra activo"){

        super(message);
        this.name = "DepartmentIsAlreadyActiveError"
        
    }
}

export class DepartmentIsAlreadyInactiveError extends AppError{
    code = 1707;
    constructor(message : string = "El departamento ya se encuentra inactivo"){

        super(message);
        this.name = "DepartmentIsAlreadyInactiveError"
        
    }
}

export class DepartmentAlreadyExistsError extends AppError{
    code = 1708;
    constructor(message : string = "El departamento ya se encuentra creado, intente con un ID diferente"){

        super(message);
        this.name = "DepartmentAlreadyExistsError"
        
    }
}

export class DepartmentUniqueKeysError extends AppError{
    code = 1709;
    constructor(message : string = "El campo ID de departamento debe ser unico para cada departamento"){

        super(message);
        this.name = "DepartmentUniqueKeysError"
        
    }
}