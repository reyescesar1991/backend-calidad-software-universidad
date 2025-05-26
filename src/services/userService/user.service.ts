import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./interfaces/IUserRepository";
import { UserValidator } from "../../core/validators";
import { TransactionManager } from "../../core/database/transactionManager";
import { ObjectIdParam } from "../../validations";
import { UserDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { FilterOptions, UserConfigFilterKeys } from "../../core/types";

@injectable()
export class UserService {

    constructor(
        @inject("IUserRepository") private readonly userRepository: IUserRepository,
        @inject("UserValidator") private readonly userValidator : UserValidator,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
    ) { }

    async findUserById(idUser: ObjectIdParam): Promise<UserDocument | null>{

        try {

            const user = await this.userRepository.findUserById(idUser);

            UserValidator.validateUserExists(user);

            return user;
            
        } catch (error) {

            handleError(error);
            
        }
    }

    async findUserByCustomId(customIdUser: string): Promise<UserDocument | null>{

        try {

            const user = await this.userRepository.findUserByCustomId(customIdUser);

            UserValidator.validateUserExists(user);

            return user;
            
        } catch (error) {

            handleError(error);
            
        }
    }

    async findUserByUsername(username: string): Promise<UserDocument | null>{

        try {

            const user = await this.userRepository.findUserByUsername(username);

            UserValidator.validateUserExistsByUsername(user);

            return user;
            
        } catch (error) {

            handleError(error);
            
        }
    }

    async searchUserByFilter(filter: FilterOptions<UserConfigFilterKeys>): Promise<UserDocument[] | null>{

        try {

            UserValidator.validateFilterRole(filter);

            const users = await this.userRepository.searchUserByFilter(filter);

            

            
        } catch (error) {
            
            handleError(error);
        }
    }
}