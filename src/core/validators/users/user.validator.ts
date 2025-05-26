import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../services/userService";
import { UserDocument } from "../../../db/models";
import { FilterUserConfigError, UserNotFoundByIdError, UserNotFoundByUsernameError } from "../../exceptions";
import { FilterOptions, RoleConfigFilterKeys, UserConfigFilterKeys } from "../../types";
import { UserFilterSchema } from "../../../validations";

@injectable()
export class UserValidator {

    constructor(@inject("IUserRepository") private readonly userRepository: IUserRepository) { }

    static validateUserExists(user: UserDocument): void {

        if (!user) throw new UserNotFoundByIdError();
    }

    static validateUserExistsByUsername(user: UserDocument): void {

        if (!user) throw new UserNotFoundByUsernameError();
    }

    static validateFilterRole(filter: FilterOptions<UserConfigFilterKeys>): void {

        const resultSchema = UserFilterSchema.safeParse(filter);

        if (!resultSchema.success) {

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterUserConfigError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
}