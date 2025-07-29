import { ClientSession } from "mongoose";
import { WarehouseDocument } from "../../../db/models/warehouseModels/warehouse.model";
import { ObjectIdParam, UpdateWarehouseDto, WarehouseDto } from "../../../validations";

export interface IWarehouseRepository{

    findWarehouseById(idWarehouse : ObjectIdParam) : Promise<WarehouseDocument | null>;
    findWarehouseByCustomId(idWarehouse : string) : Promise<WarehouseDocument | null>;
    findWarehouseByHeadquarterId(idHeadquarter : ObjectIdParam) : Promise<WarehouseDocument | null>;
    createWarehouse(dataWarehouse : WarehouseDto, session ?: ClientSession) : Promise<WarehouseDocument | null>;
    updateWarehouse(idWarehouse : ObjectIdParam, dataUpdateWarehouse : UpdateWarehouseDto, session ?: ClientSession) : Promise<WarehouseDocument | null>;
    inactivateWarehouse(idWarehouse : ObjectIdParam, session ?: ClientSession) : Promise<WarehouseDocument | null>;
    activateWarehouse(idWarehouse : ObjectIdParam, session ?: ClientSession) : Promise<WarehouseDocument | null>;
    findAllWarehouses() : Promise<WarehouseDocument[] | null>;
    getCapacityWarehouse(idWarehouse : ObjectIdParam) : Promise<number | null>;
    updateCapacityWarehousePerPallet(idWarehouse : ObjectIdParam, newCapacityPallet: number, session ?: ClientSession) : Promise<WarehouseDocument | null>;
    getCurrentCapacityWarehouse(idWarehouse : ObjectIdParam) : Promise<number | null>;
    addCurrentCapacityWarehousePerBox(idWarehouse : ObjectIdParam, addBoxes : number, session ?: ClientSession) : Promise<WarehouseDocument | null>;
    decreaseCurrentCapacityWarehousePerBox(idWarehouse : ObjectIdParam, decreaseBoxes : number, session ?: ClientSession) : Promise<WarehouseDocument | null>;
}