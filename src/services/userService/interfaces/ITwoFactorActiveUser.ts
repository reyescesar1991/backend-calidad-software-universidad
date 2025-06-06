import { ClientSession } from "mongoose";
import { UsersTwoFactorActiveDocument } from "../../../db/models";
import { ObjectIdParam, UserTwoFactorActiveDto } from "../../../validations";

export interface ITwoFactorUserRepository {

    getTwoFactorUser(userId : ObjectIdParam) : Promise<UsersTwoFactorActiveDocument | null>;
    listTwoFactorUsers() : Promise<UsersTwoFactorActiveDocument[] | null>;
    addTwoFactorUser(dataFactorUserParam: UserTwoFactorActiveDto, session?:ClientSession) : Promise<UsersTwoFactorActiveDocument | null>;
    activateTwoFactorUser(userId : ObjectIdParam, session?:ClientSession) : Promise<UsersTwoFactorActiveDocument | null>;
    inactivateTwoFactorUser(userId : ObjectIdParam, session?:ClientSession) : Promise<UsersTwoFactorActiveDocument | null>;
}