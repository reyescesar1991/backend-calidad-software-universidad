"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTermIsAlreadyInactiveError = exports.PaymentTermIsAlreadyActiveError = exports.DiscountCannotBeLessThanZeroError = exports.DaysToPayCannotBeLessThanOneError = exports.PaymentTermsIDAlreadyExistsError = exports.PaymentTermNotFoudError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class PaymentTermNotFoudError extends general_exceptions_1.AppError {
    code = 2500;
    constructor(message = "El termino de pago no fue encontrado, intente nuevamente con un ID valido") {
        super(message);
        this.name = "PaymentTermNotFoudError";
    }
}
exports.PaymentTermNotFoudError = PaymentTermNotFoudError;
class PaymentTermsIDAlreadyExistsError extends general_exceptions_1.AppError {
    code = 2501;
    constructor(message = "El ID del termino de pago ya existe, intente nuevamente con otro diferente") {
        super(message);
        this.name = "PaymentTermsIDAlreadyExistsError";
    }
}
exports.PaymentTermsIDAlreadyExistsError = PaymentTermsIDAlreadyExistsError;
class DaysToPayCannotBeLessThanOneError extends general_exceptions_1.AppError {
    code = 2502;
    constructor(message = "Los dias para pagar de un termino de pago no pueden ser menores a uno") {
        super(message);
        this.name = "DaysToPayCannotBeLessThanOneError";
    }
}
exports.DaysToPayCannotBeLessThanOneError = DaysToPayCannotBeLessThanOneError;
class DiscountCannotBeLessThanZeroError extends general_exceptions_1.AppError {
    code = 2503;
    constructor(message = "El descuente de un termino de pago no pueden ser menores a cero") {
        super(message);
        this.name = "DiscountCannotBeLessThanZeroError";
    }
}
exports.DiscountCannotBeLessThanZeroError = DiscountCannotBeLessThanZeroError;
class PaymentTermIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 2504;
    constructor(message = "El termino de pago ya se encuentra activo") {
        super(message);
        this.name = "PaymentTermIsAlreadyActiveError";
    }
}
exports.PaymentTermIsAlreadyActiveError = PaymentTermIsAlreadyActiveError;
class PaymentTermIsAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 2505;
    constructor(message = "El termino de pago ya se encuentra inactivo") {
        super(message);
        this.name = "DiscountCannotBeLessThanZeroError";
    }
}
exports.PaymentTermIsAlreadyInactiveError = PaymentTermIsAlreadyInactiveError;
//# sourceMappingURL=paymentTerm.exception.js.map