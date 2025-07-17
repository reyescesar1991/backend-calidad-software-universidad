"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorUserService = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../../core/database/transactionManager");
const exceptions_1 = require("../../../core/exceptions");
const validators_1 = require("../../../core/validators");
const mail_service_1 = require("../../mailService/mail.service");
const user_service_1 = require("../../userService/user.service");
const SecurityAudit_service_1 = require("./SecurityAudit.service");
const enums_1 = require("../../../core/enums");
const transaccional_wrapper_1 = require("../../../core/utils/transaccional-wrapper");
let TwoFactorUserService = class TwoFactorUserService {
    transactionManager;
    twoFactorUserActiveRepository;
    twoFactorValueRepository;
    mailService;
    userValidator;
    userService;
    securityAuditService;
    constructor(transactionManager, twoFactorUserActiveRepository, twoFactorValueRepository, mailService, userValidator, userService, securityAuditService) {
        this.transactionManager = transactionManager;
        this.twoFactorUserActiveRepository = twoFactorUserActiveRepository;
        this.twoFactorValueRepository = twoFactorValueRepository;
        this.mailService = mailService;
        this.userValidator = userValidator;
        this.userService = userService;
        this.securityAuditService = securityAuditService;
    }
    async generateAndSendCode(userId, email, sessionParam) {
        try {
            //1. Verificar que el usuario tenga un registro en tabla intermedia de factor-user y que este activo, ademas que no este bloqueado
            const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(userId);
            validators_1.UserValidator.validateTwoFactorUserIsAlreadyInactive(userFactorActive.isActive);
            const statusUser = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(statusUser.status);
            //2. Verificamos que el usuario tenga un registro en la tabla valor de factor de autenticacion, si es asi lanzamos un error
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);
            validators_1.TwoFactorValueValidator.validateTwoFactorDataBaseExists(userFactorValue);
            //3. Validamos que el email este previamente registrado
            await this.userValidator.validateEmailUser(userId, email);
            //4. Generar código de 6 dígitos
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            //5. Generar la fecha de expiracion
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
            const registryAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(userId);
            console.log(registryAudit);
            //6. Si no existe un registro en el audit, lo creamos para ese usuario
            if (!registryAudit) {
                //6.1 Si no existe, lo creamos
                await this.securityAuditService.createRegistrySecurityAudit({
                    userId: userId,
                }, sessionParam);
            }
            else {
                //6.2 Si ya existe, verificamos que el maximo de intentos ya no haya superado los 3, si es asi el usuario se tendra que bloquear
                await this.validateNumberAttempsFactor(registryAudit, userId, sessionParam);
            }
            //7. Envio por correo el código
            await this.mailService.sendTwoFactorCode(email, code);
            // //8. Sumamos uno al segundo factor
            // await this.securityAuditService.addAttempSecondFactor(userId, sessionParam);
            //8. Creo el registro en la tabla temporal de valores
            return await this.twoFactorValueRepository.generateAndSendCode({
                userId: userFactorActive.userId,
                value: code,
                method: userFactorActive.twoFactorId,
                expiresAt: expiresAt,
            }, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async validateFactorUser(userId, code, sessionParam) {
        console.log("cODE: ", code);
        try {
            // PASO 1: OBTENER LOS DATOS CRÍTICOS UNA SOLA VEZ AL INICIO
            const user = await this.userService.findUserById(userId);
            const dataUserAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(userId);
            const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(userId);
            // =================================================================
            // PASO 2: VALIDACIÓN DE BLOQUEO "FAIL FAST" (LA LÓGICA CLAVE)
            // Si ya ha superado el límite de intentos, no procesamos nada más.
            // =================================================================
            validators_1.UserValidator.validateTwoFactorUserIsAlreadyInactive(userFactorActive.isActive);
            validators_1.SecurityAuditValidator.validateSecurityAuditRegistryExists(dataUserAudit);
            validators_1.SecurityAuditValidator.validateSecurityAuditAttempsUserSecondFactor(dataUserAudit);
            // Ahora que sabemos que el usuario NO está bloqueado, validamos su estado actual.
            // Esto previene otros estados como "PENDIENTE", "ELIMINADO", etc. 
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            // PASO 3: OBTENER Y VALIDAR EL CÓDIGO 2FA
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);
            validators_1.TwoFactorValueValidator.validateTwoFactorDataBaseNotExists(userFactorValue);
            // PASO 4: COMPARAR EL CÓDIGO Y ACTUAR
            if (code !== userFactorValue.value) {
                // El código es incorrecto
                // 4.1 Incrementamos el contador
                const updatedAudit = await this.securityAuditService.addAttempSecondFactor(userId, sessionParam);
                // 4.2 DESPUÉS de incrementar, verificamos si este fue el intento que lo bloquea
                await this.validateNumberAttempsFactor(updatedAudit, userId, sessionParam);
                // 4.3 Actualizamos la fecha del último intento fallido
                const lastAttempLogin = {
                    lastFailedLogin: new Date(Date.now() + 10 * 60 * 1000)
                };
                await this.securityAuditService.updateRegistrySecurityAudit(userId, lastAttempLogin, sessionParam);
                return false;
            }
            else {
                // El código es correcto
                // 4.4 Reseteamos el contador
                await this.securityAuditService.resetAttempSecondFactor(userId, sessionParam);
                //4.5 Colocamos un minuto de duracion para la autenticacion
                const twoFactorVerifiedUntil = {
                    twoFactorVerifiedUntil: new Date(Date.now() + 60 * 1000),
                };
                await this.securityAuditService.updateRegistrySecurityAudit(userId, twoFactorVerifiedUntil, sessionParam);
                // 4.6 Eliminamos el código de un solo uso
                await this.twoFactorValueRepository.deleteTwoFactorValueUser(userId, sessionParam);
                return true;
            }
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async deleteTwoFactorValueUser(userId, session) {
        try {
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);
            validators_1.TwoFactorValueValidator.validateTwoFactorDataBaseExists(userFactorValue);
            return await this.twoFactorValueRepository.deleteTwoFactorValueUser(userId, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    //Funcion que me permite verificar que si el intentos ha sido mas de dos, bloquear al usuario
    async validateNumberAttempsFactor(dataUserAudit, idUser, session) {
        if (dataUserAudit.secondFactorAttempts >= 3) {
            console.log(dataUserAudit.secondFactorAttempts);
            await this.userService.changeStatusUser(enums_1.StatusUserEnum.BLOCKED, idUser, session);
        }
    }
};
exports.TwoFactorUserService = TwoFactorUserService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorUserService.prototype, "generateAndSendCode", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorUserService.prototype, "validateFactorUser", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorUserService.prototype, "deleteTwoFactorValueUser", null);
exports.TwoFactorUserService = TwoFactorUserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TransactionManager")),
    __param(1, (0, tsyringe_1.inject)("ITwoFactorUserRepository")),
    __param(2, (0, tsyringe_1.inject)("ITwoFactorValueRepository")),
    __param(3, (0, tsyringe_1.inject)(mail_service_1.MailService)),
    __param(4, (0, tsyringe_1.inject)("UserValidator")),
    __param(5, (0, tsyringe_1.inject)("UserService")),
    __param(6, (0, tsyringe_1.inject)("SecurityAuditService")),
    __metadata("design:paramtypes", [transactionManager_1.TransactionManager, Object, Object, mail_service_1.MailService,
        validators_1.UserValidator,
        user_service_1.UserService,
        SecurityAudit_service_1.SecurityAuditService])
], TwoFactorUserService);
//# sourceMappingURL=TwoFactorUser.service.js.map