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
exports.UserValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const validations_1 = require("../../../validations");
const enums_1 = require("../../enums");
let UserValidator = class UserValidator {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    static validateUserExists(user) {
        if (!user)
            throw new exceptions_1.UserNotFoundByIdError();
    }
    static validateUserExistsByUsername(user) {
        if (!user)
            throw new exceptions_1.UserNotFoundByUsernameError();
    }
    static validateUsersExistsByFilter(users) {
        if (users.length < 1)
            throw new exceptions_1.UserNotFoundByFilterError();
    }
    static validateFilterRole(filter) {
        const resultSchema = validations_1.UserFilterSchema.safeParse(filter);
        if (!resultSchema.success) {
            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterUserConfigError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    static validatePasswordInHistory(isPasswordInHistory) {
        if (!isPasswordInHistory)
            throw new exceptions_1.PasswordIsNotInTheHistoryUserError();
    }
    static validateTwoFactorUserIsAlreadyActive(statusTwoFactorUser) {
        if (statusTwoFactorUser)
            throw new exceptions_1.TwoFactorUserIsAlreadyActive();
    }
    static validateTwoFactorUserIsAlreadyInactive(statusTwoFactorUser) {
        if (!statusTwoFactorUser)
            throw new exceptions_1.TwoFactorUserIsAlreadyInactive();
    }
    static validateStatusUserIsActive(statusUser) {
        if (statusUser !== enums_1.StatusUserEnum.ACTIVE)
            throw new exceptions_1.UserStatusIsAlreadyNotActiveError();
    }
    async validateUniquenessUserData(idUser) {
        const user = await this.userRepository.findUserByCustomId(idUser);
        if (user)
            throw new exceptions_1.UserAlreadyExistsError();
    }
    async validateExistsUserDataAsync(idUser) {
        const user = await this.userRepository.findUserById(idUser);
        if (!user)
            throw new exceptions_1.UserNotFoundByIdError();
    }
    async validateUniqueKeysUser(filter) {
        const users = await this.userRepository.searchUsersByFilterWithOr(filter);
        if (users.length >= 1)
            throw new exceptions_1.UserUniqueKeysError();
    }
    async validateStatusUserForChange(idUser, newStatus) {
        const user = await this.userRepository.findUserById(idUser);
        if (user.status === newStatus)
            throw new exceptions_1.UserStatusAlreadyItsSameError();
    }
    async validateEmailUser(idUser, emailUser) {
        const user = await this.userRepository.findUserById(idUser);
        if (user.email !== emailUser)
            throw new exceptions_1.UserEmailNotMatchError();
    }
    //TODO: Para el middleware de verificacion de status del usuario que realiza las acciones
    async validateStatusUser(idUser) {
        const user = await this.userRepository.findUserById(idUser);
        if (user.status !== enums_1.StatusUserEnum.ACTIVE)
            throw new exceptions_1.UserNotActiveError();
    }
};
exports.UserValidator = UserValidator;
exports.UserValidator = UserValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], UserValidator);
//# sourceMappingURL=user.validator.js.map