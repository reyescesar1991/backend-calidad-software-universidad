import { inject, injectable } from "tsyringe";
import { WarehouseDocument } from "../../../db/models";
import { CurrentCapacityExceedsCapacityWarehouseError, WarehouseCustomIdAlreadyExistsError, WarehouseIsAlreadyActiveError, WarehouseIsAlreadyInactiveError, WarehouseNotFoundError } from "../../exceptions";
import { IWarehouseRepository } from "../../../services/locationService";

@injectable()
export class WarehouseValidator{

    constructor(
        @inject("IWarehouseRepository") private readonly warehouseRepository : IWarehouseRepository,
    ){}


    static validateWarehouseExists(warehouse : WarehouseDocument) : void {

        if(!warehouse) throw new WarehouseNotFoundError();
    }

    async validateIdWarehouseUniqueness(idWarehouse : string) : Promise<void>{

        const warehouse = await this.warehouseRepository.findWarehouseByCustomId(idWarehouse);

        if(warehouse) throw new WarehouseCustomIdAlreadyExistsError();
    }

    static validateCurrentCapacityWithCapacity(currentCapacity : number, capacity : number) : void{

        if(currentCapacity >= capacity) throw new CurrentCapacityExceedsCapacityWarehouseError();
    }

    static validateWarehouseIsAlreadyInactive(warehouse : WarehouseDocument) : void {

        if(!warehouse.isActive) throw new WarehouseIsAlreadyInactiveError();
    }

    static validateWarehouseIsAlreadyActive(warehouse : WarehouseDocument) : void {

        if(warehouse.isActive) throw new WarehouseIsAlreadyActiveError();
    }

}