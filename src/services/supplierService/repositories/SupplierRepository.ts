import { inject, injectable } from "tsyringe";
import { ISupplierRepository } from "../interfaces/ISupplierRepository";
import { ClientSession, FilterQuery, Model } from "mongoose";
import { SupplierDocument } from "../../../db/models";
import { ObjectIdParam, SupplierDto, UpdateSupplierDto } from "../../../validations";

@injectable()
export class SupplierRepositoryImpl implements ISupplierRepository {

    constructor(
        @inject("SupplierModel") private readonly SupplierModel: Model<SupplierDocument>,
    ) { }

    async findSupplierById(idSupplier: ObjectIdParam): Promise<SupplierDocument | null> {

        return await this.SupplierModel.findById(idSupplier).exec();
    }

    async findSupplierByCustomId(customIdSupplier: string): Promise<SupplierDocument | null> {

        return await this.SupplierModel.findOne({ id: customIdSupplier }).exec();
    }

    async createSupplier(dataCreateSupplier: SupplierDto, session?: ClientSession): Promise<SupplierDocument | null> {

        const [supplier] = await this.SupplierModel.create([dataCreateSupplier], { session });

        return supplier;
    }

    async updateSupplier(idSupplier: ObjectIdParam, dataUpdateSupplier: UpdateSupplierDto, session?: ClientSession): Promise<SupplierDocument | null> {

        return await this.SupplierModel.findByIdAndUpdate(

            idSupplier,
            dataUpdateSupplier,
            { new: true, runValidators: true, session }
        ).exec()
    }

    async activateSupplier(idSupplier: ObjectIdParam, session?: ClientSession): Promise<SupplierDocument | null> {

        return await this.SupplierModel.findByIdAndUpdate(
            idSupplier,
            { $set: { isActive: true } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async inactivateSupplier(idSupplier: ObjectIdParam, session?: ClientSession): Promise<SupplierDocument | null> {
        return await this.SupplierModel.findByIdAndUpdate(
            idSupplier,
            { $set: { isActive: false } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async findSuppliersByName(name: string, isActive?: boolean): Promise<SupplierDocument[] | null> {
        const query: FilterQuery<SupplierDocument> = {
            $or: [
                { name: { $regex: name, $options: 'i' } }, // Búsqueda case-insensitive
                { tradeName: { $regex: name, $options: 'i' } }
            ]
        };
        if (typeof isActive === 'boolean') {
            query.isActive = isActive;
        }
        return await this.SupplierModel.find(query).exec();
    }

    async findSuppliersByLocation(city?: string, state?: string, country?: string, isActive?: boolean): Promise<SupplierDocument[] | null> {
        const query: FilterQuery<SupplierDocument> = {};
        if (city) query.city = city;
        if (state) query.state = state;
        if (country) query.country = country;
        if (typeof isActive === 'boolean') query.isActive = isActive;
        return await this.SupplierModel.find(query).exec();
    }

    async findAllSuppliers(isActive?: boolean): Promise<SupplierDocument[] | null> {
        const query: FilterQuery<SupplierDocument> = {};
        if (typeof isActive === 'boolean') {
            query.isActive = isActive;
        }
        return await this.SupplierModel.find(query).exec();
    }

    async findSuppliersByPaymentTerm(paymentTermId: ObjectIdParam, isActive?: boolean): Promise<SupplierDocument[] | null> {
        const query: FilterQuery<SupplierDocument> = { paymentTerm: paymentTermId };
        if (typeof isActive === 'boolean') {
            query.isActive = isActive;
        }
        return await this.SupplierModel.find(query).exec();
    }

    async existsByContactInfo(email?: string, phoneNumber?: string, taxId?: string, name?: string, tradeName?: string, contactPerson?: string, businessRegistrationNumber?: string, excludeId?: ObjectIdParam): Promise<boolean> {

        const query: FilterQuery<SupplierDocument> = { $or: [] };
        if (email) query.$or.push({ email });
        if (phoneNumber) query.$or.push({ phoneNumber });
        if (taxId) query.$or.push({ taxId });
        if (name) query.$or.push({ name });
        if (tradeName) query.$or.push({ tradeName });
        if (contactPerson) query.$or.push({ contactPerson });
        if (businessRegistrationNumber) query.$or.push({ businessRegistrationNumber });

        if (query.$or.length === 0) return false;

        if (excludeId) {
            // Para excluir el documento actual durante una actualización
            query._id = { $ne: excludeId };
        }

        const count = await this.SupplierModel.countDocuments(query).exec();
        return count > 0;
    }
}