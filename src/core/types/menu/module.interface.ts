import { IRouteType } from "./route.interface";

export interface IModuleType{

    id: string;
    title: string;
    routes : IRouteType[];
}