import { Types } from "mongoose";
import { VALID_PERMISSIONS, VALID_PERMISSIONS_SECURITY } from "../../const";

// permission.helper.ts
export const isPermissionAllowedForRole = (
    roleId: string,
    permission: string
): boolean => {
    const allowedPermissions = [
        ...(VALID_PERMISSIONS[roleId] || []),
        ...(VALID_PERMISSIONS_SECURITY[roleId] || [])
    ];
    return allowedPermissions.includes(permission);
};
