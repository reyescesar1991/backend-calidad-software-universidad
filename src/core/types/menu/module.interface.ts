import { Schema } from "mongoose";

export interface IModuleType{

    id: string;
    title: string;
    route: Schema.Types.ObjectId;
}