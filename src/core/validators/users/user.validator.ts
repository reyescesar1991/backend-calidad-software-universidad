import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../services/userService";
import { UserDocument } from "../../../db/models";
import { FilterUserConfigError, PasswordIsNotInTheHistoryUserError, TwoFactorUserIsAlreadyActive, TwoFactorUserIsAlreadyInactive, UserAlreadyExistsError, UserNotActiveError, UserNotFoundByFilterError, UserNotFoundByIdError, UserNotFoundByUsernameError, UserStatusAlreadyItsSameError, UserUniqueKeysError } from "../../exceptions";
import { FilterOptions, RoleConfigFilterKeys, UserConfigFilterKeys } from "../../types";
import { ObjectIdParam, UserFilterSchema } from "../../../validations";
import { StatusUserEnum } from "../../enums";

@injectable()
export class UserValidator {

    constructor(@inject("IUserRepository") private readonly userRepository: IUserRepository) { }

    static validateUserExists(user: UserDocument): void {

        if (!user) throw new UserNotFoundByIdError();
    }

    static validateUserExistsByUsername(user: UserDocument): void {

        if (!user) throw new UserNotFoundByUsernameError();
    }

    static validateUsersExistsByFilter(users: UserDocument[]): void {

        if (users.length < 1) throw new UserNotFoundByFilterError();
    }

    static validateFilterRole(filter: FilterOptions<UserConfigFilterKeys>): void {

        const resultSchema = UserFilterSchema.safeParse(filter);

        if (!resultSchema.success) {

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterUserConfigError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }

    static validatePasswordInHistory(isPasswordInHistory : boolean) : void{

        if(!isPasswordInHistory) throw new PasswordIsNotInTheHistoryUserError();
    }

    static validateTwoFactorUserIsAlreadyActive(statusTwoFactorUser : boolean) : void {

        if(statusTwoFactorUser) throw new TwoFactorUserIsAlreadyActive();
    }

    static validateTwoFactorUserIsAlreadyInactive(statusTwoFactorUser : boolean) : void {

        if(!statusTwoFactorUser) throw new TwoFactorUserIsAlreadyInactive();
    }

    async validateUniquenessUserData(idUser: string): Promise<void> {


        const user = await this.userRepository.findUserByCustomId(idUser);

        if (user) throw new UserAlreadyExistsError();
    }

    async validateExistsUserDataAsync(idUser: ObjectIdParam): Promise<void> {

        const user = await this.userRepository.findUserById(idUser);

        if (!user) throw new UserNotFoundByIdError();
    }

    async validateUniqueKeysUser(filter: FilterOptions<UserConfigFilterKeys>): Promise<void> {

        const users = await this.userRepository.searchUsersByFilterWithOr(filter);

        if (users.length >= 1) throw new UserUniqueKeysError();
    }

    async validateStatusUserForChange(idUser : ObjectIdParam, newStatus : string) : Promise<void>{

        const user = await this.userRepository.findUserById(idUser);

        if(user.status === newStatus) throw new UserStatusAlreadyItsSameError();
    }

    //TODO: Para el middleware de verificacion de status del usuario que realiza las acciones
    async validateStatusUser(idUser : ObjectIdParam) : Promise<void>{

        const user = await this.userRepository.findUserById(idUser);

        if(user.status !== StatusUserEnum.ACTIVE) throw new UserNotActiveError();
    }
}