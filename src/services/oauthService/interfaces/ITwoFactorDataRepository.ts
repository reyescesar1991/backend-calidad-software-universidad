import { ClientSession } from "mongoose";
import { TwoFactorAuthDocument } from "../../../db/models";
import { ObjectIdParam, TwoFactorAuthDto, UpdateTwoFactorAuthDto } from "../../../validations";

export interface ITwoFactorDataRepository {

    getFactorsAvailable() : Promise<TwoFactorAuthDocument | null>;
    findFactorById(factorId : ObjectIdParam) : Promise<TwoFactorAuthDocument | null>;
    findFactorByMethod(methodFactor : string) : Promise<TwoFactorAuthDocument | null>;
    addFactor(dataFactor : TwoFactorAuthDto, session?: ClientSession) : Promise<TwoFactorAuthDocument | null>;
    updateFactor(factorId : ObjectIdParam, dataFactor : UpdateTwoFactorAuthDto, session?: ClientSession) : Promise<TwoFactorAuthDocument | null>;
    enableFactor(factorId : ObjectIdParam, session?: ClientSession) : Promise<TwoFactorAuthDocument | null>;
    disableFactor(factorId : ObjectIdParam, session?: ClientSession) : Promise<TwoFactorAuthDocument | null>;
    addUserQuantity(factorId : ObjectIdParam, session?: ClientSession) : Promise<TwoFactorAuthDocument | null>;
}