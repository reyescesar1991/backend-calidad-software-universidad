import { Schema } from "mongoose";

export interface IModuleType{

    id: string;
    title: string;
    routes : Schema.Types.ObjectId[],
}