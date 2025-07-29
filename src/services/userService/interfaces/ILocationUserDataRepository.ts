import { ClientSession } from "mongoose";
import { LocationUserDocument } from "../../../db/models";
import { LocationUserDataDto } from "../../../validations";


export interface ILocationUserDataRepository{

    createLocationUserData(dataLocationUser : LocationUserDataDto, session?: ClientSession) : Promise<LocationUserDocument | null>;
    getLocationUserData(idUser : string) : Promise<LocationUserDocument | null>;
}