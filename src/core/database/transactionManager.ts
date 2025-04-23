// src/core/database/TransactionManager.ts
import { injectable } from "tsyringe";
import mongoose, { ClientSession } from "mongoose";

@injectable()
export class TransactionManager {


    async startSession(): Promise<ClientSession> {
        return mongoose.startSession();
    }

    async executeTransaction<T>(
        operation: (session: ClientSession) => Promise<T>
    ): Promise<T> {
        const session = await this.startSession();
        session.startTransaction();
        try {
            const result = await operation(session);
            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async commitTransaction(session: ClientSession): Promise<void> {
        await session.commitTransaction();
    }

    async abortTransaction(session: ClientSession): Promise<void> {
        await session.abortTransaction();
    }
}