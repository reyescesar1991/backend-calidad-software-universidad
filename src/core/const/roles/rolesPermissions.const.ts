export const VALID_PERMISSIONS: Record<string, string[]> = {
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
    '02' : [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto',
        'reporte_estado_general',
        'reporte_bajo_stock',
        'reporte_valor_total_inventario',
    ],
    '04' : [
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
    "06" : [
        'modificar_producto',
    ]
};

export const VALID_PERMISSIONS_SECURITY: Record<string, string[]> = {
    '04' : [
        'forzar_cambio_contraseña',
        'bloquear_cuenta_temporalmente',
        'autenticacion_factor',
    ],
    '06' : [

        'force_password_reset',
        'account_lock',
        'two_factor_auth'
    ]
};

export const ROLS_DEFAULT : Array<string> = [

    "01",
    "02",
    "03",
    "04"
]

export const ROLS_NOT_VALID_DEFAULT : Array<string> = [

    "02",
    "03",
    "04",
]
