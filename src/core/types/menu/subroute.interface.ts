import { Schema } from "mongoose";

export interface ISubrouteType{

    id: string,
    name : string,
    path : string,
    active : boolean,
    permissionKey: string,
    mainRoute : string,
    parentId: Schema.Types.ObjectId, 
}