export interface LoginResponseDto {

    token?: string; // Token de acceso final
    needsTwoFactor?: boolean; // Indica si se necesita 2FA
    userId?: string; // Si needsTwoFactor es true, para que el frontend sepa a qué usuario pedir 2FA
    // Otros datos que puedas necesitar, como un "preAuthToken"
    preAuthToken?: string; // Un token temporal para el paso de 2FA
}