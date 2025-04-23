import "reflect-metadata";
import { container } from "tsyringe";
import { SubrouteModel } from "../../../db/models";
import { ISubrouteRepository } from "../../../services/menu";
import { SubrouteRepository } from "../../../services/menu/repositories/subrouteRepository";
import { MenuService } from "../../../services/menu/Menu.service";
import { SubrouteValidator } from "../../validators";
import { TransactionManager } from "../../database/transactionManager";

container.register("TransactionManager" , TransactionManager);

container.register("SubrouteModel" , {useValue : SubrouteModel});

container.register<ISubrouteRepository>("ISubrouteRepository", {useClass: SubrouteRepository});

container.register("MenuService", {useClass : MenuService});

container.register("SubrouteValidator", {
    useClass: SubrouteValidator
});