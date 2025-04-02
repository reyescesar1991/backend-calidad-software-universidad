import { CompanyDepartmentEnum } from "../../enums/departmentEnums/department.enum";

export const departmentAbbreviationsMap = new Map<CompanyDepartmentEnum, string>([
    [CompanyDepartmentEnum.COMPRAS, "CMP"],
    [CompanyDepartmentEnum.VENTAS, "VNT"],
    [CompanyDepartmentEnum.ALMACEN, "ALM"],
    [CompanyDepartmentEnum.LOGISTICA, "LOG"],
    [CompanyDepartmentEnum.MARKETING, "MKT"],
    [CompanyDepartmentEnum.ATENCION_AL_CLIENTE, "ATC"],
    [CompanyDepartmentEnum.FINANZAS, "FIN"],
    [CompanyDepartmentEnum.ADMINISTRACION, "ADM"],
    [CompanyDepartmentEnum.RECURSOS_HUMANOS, "RRHH"],
    [CompanyDepartmentEnum.TECNOLOGIA_DE_LA_INFORMACION, "TI"],
    [CompanyDepartmentEnum.CONTROL_DE_CALIDAD, "CC"],
    [CompanyDepartmentEnum.CONTABILIDAD, "CON"],
    [CompanyDepartmentEnum.LEGAL, "LEG"],
    [CompanyDepartmentEnum.PLANIFICACION, "PLA"],
    [CompanyDepartmentEnum.IMPORTACIONES, "IMP"],
    [CompanyDepartmentEnum.EXPORTACIONES, "EXP"],
    [CompanyDepartmentEnum.SERVICIO_TECNICO, "ST"],
  ]);