import { RouteWithSubroutes } from "./routeWithSubroutes.interface";

export interface ModuleWithRoutes {
  id: string;
  title: string;
  routes: RouteWithSubroutes[]; // Array de las subrutas simplificadas
}