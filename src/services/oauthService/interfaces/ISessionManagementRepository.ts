import { ClientSession } from "mongoose";
import { SessionManagementDocument } from "../../../db/models";
import { SessionManagementDto, UpdateSessionManagementDto} from "../../../validations";


export interface ISessionManagementRepository {

    createSessionUser(sessionUser : SessionManagementDto, session ?: ClientSession) : Promise<SessionManagementDocument | null>;
    getSessionUserValidate(customId : string) : Promise<SessionManagementDocument | null>;
    updateSessionUser(customId : string, dataUpdateSession: UpdateSessionManagementDto,  session ?: ClientSession) : Promise<SessionManagementDocument | null>;
    deleteSessionUser(customId: string, session?: ClientSession) : Promise<SessionManagementDocument | null>;
}