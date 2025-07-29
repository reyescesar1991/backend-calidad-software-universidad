import { ClientSession, Model } from "mongoose";
import { WarehouseDocument } from "../../../db/models";
import { ObjectIdParam, WarehouseDto, UpdateWarehouseDto } from "../../../validations";
import { IWarehouseRepository } from "../interfaces/IWarehouseRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class WarehouseRepositoryImpl implements IWarehouseRepository {


    constructor(
        @inject("WarehouseModel") private readonly WarehouseModel: Model<WarehouseDocument>,
    ) { }

    async findWarehouseByHeadquarterId(idHeadquarter: ObjectIdParam): Promise<WarehouseDocument | null> {
        
        return await this.WarehouseModel.findOne({idHeadquarter : idHeadquarter}).exec();
    }


    async findWarehouseById(idWarehouse: ObjectIdParam): Promise<WarehouseDocument | null> {

        return await this.WarehouseModel.findById(idWarehouse).exec();
    }

    async findWarehouseByCustomId(idWarehouse: string): Promise<WarehouseDocument | null> {

        return await this.WarehouseModel.findOne({ idWarehouse: idWarehouse }).exec();
    }

    async createWarehouse(dataWarehouse: WarehouseDto, session?: ClientSession): Promise<WarehouseDocument | null> {

        const [newWarehouse] = await this.WarehouseModel.create([dataWarehouse], { session });

        return newWarehouse;
    }

    async updateWarehouse(idWarehouse: ObjectIdParam, dataUpdateWarehouse: UpdateWarehouseDto, session?: ClientSession): Promise<WarehouseDocument | null> {

        return await this.WarehouseModel.findByIdAndUpdate(

            idWarehouse ,
            dataUpdateWarehouse,
            { new: true, runValidators: true, session }
        ).exec();
    }

    async inactivateWarehouse(idWarehouse: ObjectIdParam, session?: ClientSession): Promise<WarehouseDocument | null> {

        return await this.WarehouseModel.findByIdAndUpdate(

            idWarehouse,
            { $set: { isActive: false } },
            { new: true, runValidators: true, session },
        ).exec();
    }

    async activateWarehouse(idWarehouse: ObjectIdParam, session?: ClientSession): Promise<WarehouseDocument | null> {

        return await this.WarehouseModel.findByIdAndUpdate(

            idWarehouse ,
            { $set: { isActive: true } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async findAllWarehouses(): Promise<WarehouseDocument[] | null> {

        return await this.WarehouseModel.find({}).exec();
    }

    async getCapacityWarehouse(idWarehouse: ObjectIdParam): Promise<number | null> {

        const warehouse = await this.WarehouseModel.findOne({
            _id : idWarehouse,
            isActive: true
        })
            // Proyección para incluir solo los campos deseados y excluir los no deseados
            .select('capacity') // Incluye explícitamente los campos que quieres
            .lean()
            .exec();

        if (warehouse && typeof warehouse.capacity === 'number') {
            return warehouse.capacity;
        } else {
            return null; // O el valor predeterminado que consideres apropiado
        }
    }

    async updateCapacityWarehousePerPallet(idWarehouse: ObjectIdParam, newCapacityPallet: number, session?: ClientSession): Promise<WarehouseDocument | null> {
        
        return await this.WarehouseModel.findByIdAndUpdate(

            idWarehouse,
            {$set : {capacity : newCapacityPallet}},
            {new: true, runValidators: true, session},
        ).exec();
    }

    async getCurrentCapacityWarehouse(idWarehouse: ObjectIdParam): Promise<number | null> {
        
        const warehouse = await this.WarehouseModel.findOne(
            {_id : idWarehouse, isActive : true},
        )
        .select('currentCapacity')
        .lean()
        .exec()

        if (warehouse && typeof warehouse.currentCapacity === 'number') {
            return warehouse.currentCapacity;
        } else {
            return null; // O el valor predeterminado que consideres apropiado
        }
    }

/**
     * Incrementa la capacidad actual de un almacén por un número de cajas.
     * Calcula el incremento total basado en unitsPerBox del almacén.
     * @param idWarehouse El _id del almacén.
     * @param addBoxes El número de cajas a añadir.
     * @param session (Opcional) La sesión de cliente para transacciones.
     * @returns El documento de almacén actualizado o null si no se encuentra o no está activo.
     */
    async addCurrentCapacityWarehousePerBox(idWarehouse: ObjectIdParam, addBoxes: number, session?: ClientSession): Promise<WarehouseDocument | null> {

            // Calcular el incremento total en unidades
            const unitsToAdd = addBoxes;

            // Paso 2: Usar findOneAndUpdate con $inc para actualizar la capacidad actual
            const updatedWarehouse = await this.WarehouseModel.findOneAndUpdate(
                { _id: idWarehouse, isActive: true }, // Criterio de búsqueda
                { $inc: { currentCapacity: unitsToAdd } }, // Operador $inc
                {
                    new: true,         // Devuelve el documento modificado
                    runValidators: true, // Ejecuta los validadores definidos en el esquema
                    session: session   // Pasa la sesión si está disponible
                }
            ).exec();

            return updatedWarehouse;

    }

    async decreaseCurrentCapacityWarehousePerBox(idWarehouse: ObjectIdParam, decreaseBoxes: number, session?: ClientSession): Promise<WarehouseDocument | null> {
        
        const updatedWarehouse = await this.WarehouseModel.findOneAndUpdate(
                { _id: idWarehouse, isActive: true }, // Criterio de búsqueda
                // Simplemente decrementa currentCapacity por removeBoxes
                { $inc: { currentCapacity: -decreaseBoxes } },
                {
                    new: true,         // Devuelve el documento modificado
                    runValidators: true, // Ejecuta los validadores definidos en el esquema (útil si tienes validación de min/max)
                    session: session   // Pasa la sesión si está disponible
                }
            ).exec();

        return updatedWarehouse;
    }


}