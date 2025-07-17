"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLS_NOT_VALID_DEFAULT = exports.ROLS_DEFAULT = exports.VALID_PERMISSIONS_SECURITY = exports.VALID_PERMISSIONS = void 0;
exports.VALID_PERMISSIONS = {
    '01': [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto'
    ],
    '03': [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto',
        'reporte_estado_general',
        'reporte_bajo_stock',
        'reporte_valor_total_inventario',
        'modificar_producto',
        'agregar_inventario',
        'registrar_venta',
        'ajustar_producto',
    ],
    '02': [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto',
        'reporte_estado_general',
        'reporte_bajo_stock',
        'reporte_valor_total_inventario',
    ],
    '04': [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto',
        'reporte_estado_general',
        'reporte_bajo_stock',
        'reporte_valor_total_inventario',
        'modificar_producto',
        'agregar_inventario',
        'registrar_venta',
        'ajustar_producto',
        'modificar_usuario',
        'listar_usuarios',
        'crear_usuario'
    ],
    "06": [
        'modificar_producto',
    ]
};
exports.VALID_PERMISSIONS_SECURITY = {
    '04': [
        'forzar_cambio_contraseña',
        'bloquear_cuenta_temporalmente',
        'autenticacion_factor',
    ],
    '06': [
        'force_password_reset',
        'account_lock',
        'two_factor_auth'
    ]
};
exports.ROLS_DEFAULT = [
    "01",
    "02",
    "03",
    "04"
];
exports.ROLS_NOT_VALID_DEFAULT = [
    "02",
    "03",
    "04",
];
//# sourceMappingURL=rolesPermissions.const.js.map