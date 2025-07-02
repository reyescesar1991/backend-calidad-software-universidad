import { SimplifiedSubroute } from "./subrouteFormat.response";

export interface RouteWithSubroutes {
  id: string;
  name: string;
  path: string;
  icon: string;
  active: boolean;
  subroutes: SimplifiedSubroute[]; // Array de las subrutas simplificadas
}