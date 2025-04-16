import { inject, injectable } from "tsyringe";
import { IPermissionSecurityRepository } from "./interfaces/IPermissionSecurityRepository";

@injectable()
export class PermissionSecurityService {

    constructor(@inject("IPermissionSecurityRepository") private readonly repository : IPermissionSecurityRepository){};

    

}