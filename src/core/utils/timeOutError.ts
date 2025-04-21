import { MongoServerError } from "mongodb";
import { DatabaseConnectionError } from "../exceptions";


export const timeOutMongoError = async (error: Error) => {

    if (error instanceof MongoServerError && error.name === "MongoServerSelectionError") {
        throw new DatabaseConnectionError();
    }
}