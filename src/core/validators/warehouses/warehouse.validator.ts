import { inject, injectable } from "tsyringe";
import { WarehouseDocument } from "../../../db/models";
import { CurrentCapacityDecreaseLessZeroCapacityWarehouseError, CurrentCapacityExceedsCapacityWarehouseError, WarehouseCustomIdAlreadyExistsError, WarehouseCustomIdNotMatchError, WarehouseIsAlreadyActiveError, WarehouseIsAlreadyInactiveError, WarehouseNotFoundError } from "../../exceptions";
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

        if(capacity > currentCapacity) throw new CurrentCapacityExceedsCapacityWarehouseError();
    }

    static validateWarehouseIsAlreadyInactive(warehouse : WarehouseDocument) : void {

        if(!warehouse.isActive) throw new WarehouseIsAlreadyInactiveError();
    }

    static validateCustomIdWarehouseItsFromTheWarehouse(customIdWarehouse: string, customIdWarehouseParam: string): void {

        if(customIdWarehouse !== customIdWarehouseParam) throw new WarehouseCustomIdNotMatchError();

    }

    static validateWarehouseIsAlreadyActive(warehouse : WarehouseDocument) : void {

        if(warehouse.isActive) throw new WarehouseIsAlreadyActiveError();
    }

    static validateCurrentCapacityNotLessZero(currentCapacity : number, decreaseCapacity : number) : void{

        const estimateQuantity = currentCapacity - decreaseCapacity;

        if(estimateQuantity < 0) throw new CurrentCapacityDecreaseLessZeroCapacityWarehouseError();
    }

}