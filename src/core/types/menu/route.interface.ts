import { Schema } from "mongoose";

export interface IRouteType{

    id : string,
    name : string,
    path : string,
    icon : string,
    active : boolean,
    subroutes : Schema.Types.ObjectId[],
}