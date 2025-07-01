import { inject, injectable } from "tsyringe";
import { ISessionManagementRepository } from "../../../services/oauthService";
import { SessionManagementDocument } from "../../../db/models";
import { UserAlreadyHaveASessionError, UserAlreadyNotHaveASessionError, UserIsNotLoggedError, UserSessionTokenIsNotValid } from "../../exceptions";


@injectable()
export class SessionManagementValidator{

    constructor(@inject("ISessionManagementRepository") private readonly sessionManagementRepository: ISessionManagementRepository) { }

    static validateUserAlreadyHaveASessionActive(sessionUser : SessionManagementDocument) : void {

        if(sessionUser) throw new UserAlreadyHaveASessionError();
    }

    static validateUserIsNotAlreadyHaveASessionActive(sessionUser : SessionManagementDocument) : void {

        if(!sessionUser) throw new UserAlreadyNotHaveASessionError();
    }

    async validateUserTokenIsValid(customUserId : string, tokenParam : string) : Promise<void> {

        const sessionLogged = await this.sessionManagementRepository.getSessionUserValidate(customUserId);

        if(sessionLogged.token !== tokenParam) throw new UserSessionTokenIsNotValid();
    }

    async validateUserIsLogged(customUserId : string) : Promise<void> {

        const sessionLogged = await this.sessionManagementRepository.getSessionUserValidate(customUserId);

        if(!sessionLogged) throw new UserIsNotLoggedError();
    }
}