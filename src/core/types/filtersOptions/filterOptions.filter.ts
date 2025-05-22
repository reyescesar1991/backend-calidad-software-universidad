export type SubrouteFilterKeys = "active" | "name" | "path" | "mainRoute";

export type RouteFilterKeys = "active" | "path" | "name" | "id";

export type ModuleFilterKeys = "id" | "title"| "active";

export type RoleFilterKeys = "idRole" | "name"| "label" | "description"| "isActive"| "isDefault"

export type RoleConfigFilterKeys = "maxLoginAttempts" | "rolName"| "isActive"

export type HeadquarterConfigFilterKeys = "idHeadquarter" | "label"| "name" | "address" | "phoneNumber" | "email" | "geoLocation" | "isActive"

export type DepartmentConfigFilterKeys = "idDepartment" | "label"| "name" | "headquartersName" | "isActive";

export type UserConfigFilterKeys = "idUser" | "name"| "lastName" | "codeCountry" | "phoneNumber" | "email" | "username" | "status" | "hasTwoFactor" | "department" | "roleConfig";