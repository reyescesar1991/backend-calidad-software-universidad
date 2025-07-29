import { injectable } from "tsyringe";
import { LocationUserDocument } from "../../../db/models";
import { LocationDataUserNotExistsError } from "../../exceptions";

@injectable()
export class LocationUserDataValidator{
    

    static validateLocationUserDataExists(location : LocationUserDocument) : void{

        if(!location) throw new LocationDataUserNotExistsError();
    }
}