
import mongoose from "mongoose";
import { BadFormatMongoIDError } from "../../exceptions";

export class CommonValidator {
  static validateObjectId(id: string): void {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadFormatMongoIDError();
    }
  }
}