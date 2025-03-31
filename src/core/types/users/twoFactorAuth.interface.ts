export type TwoFactorMethod = "sms" | "email";

export interface ITwoFactorAuthType{

    method : TwoFactorMethod;
    isEnabled : boolean;
    quantityUsers?: number;
}