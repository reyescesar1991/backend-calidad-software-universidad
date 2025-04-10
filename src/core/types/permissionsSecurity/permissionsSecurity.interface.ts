export interface IPermissionSecurity{

    label: string,
    can : boolean,
    permission : string,
    id: string; // Unique identifier for the permission
    description?: string;
    category?: string;
    isSystemDefined?: boolean;
    isActive ?: boolean;
}