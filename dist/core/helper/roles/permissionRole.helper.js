"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPermissionAllowedForRole = void 0;
const const_1 = require("../../const");
// permission.helper.ts
const isPermissionAllowedForRole = (roleId, permission) => {
    const allowedPermissions = [
        ...(const_1.VALID_PERMISSIONS[roleId] || []),
        ...(const_1.VALID_PERMISSIONS_SECURITY[roleId] || [])
    ];
    return allowedPermissions.includes(permission);
};
exports.isPermissionAllowedForRole = isPermissionAllowedForRole;
//# sourceMappingURL=permissionRole.helper.js.map