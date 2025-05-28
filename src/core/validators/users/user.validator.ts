import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../services/userService";
import { UserDocument } from "../../../db/models";
import { FilterUserConfigError, UserAlreadyExistsError, UserNotFoundByFilterError, UserNotFoundByIdError, UserNotFoundByUsernameError, UserUniqueKeysError } from "../../exceptions";
import { FilterOptions, RoleConfigFilterKeys, UserConfigFilterKeys } from "../../types";
import { ObjectIdParam, UserFilterSchema } from "../../../validations";

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

    async validateUniquenessUserData(idUser: string): Promise<void> {


        const user = await this.userRepository.findUserByCustomId(idUser);

        if (user) throw new UserAlreadyExistsError();
    }

    async validateUniqueKeysUser(filter: FilterOptions<UserConfigFilterKeys>): Promise<void> {

        const users = await this.userRepository.searchUsersByFilterWithOr(filter);

        console.log(users);

        if (users.length > 1) throw new UserUniqueKeysError();
    }
}