export const VALID_PERMISSIONS: Record<string, string[]> = {
    'Empleado de Almacen': [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto'
    ],
    'Gestor de Inventario': [
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
    'Supervisor de Inventario' : [
        'ver_listar_productos',
        'buscar_producto',
        'registrar_producto',
        'reporte_estado_general',
        'reporte_bajo_stock',
        'reporte_valor_total_inventario',
    ],
    'Administrador' : [
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
    ]
};

export const VALID_PERMISSIONS_SECURITY: Record<string, string[]> = {
    'Administrador' : [
        'forzar_cambio_contraseña',
        'bloquear_cuenta_temporalmente',
        'autenticacion_factor',
    ]
};
