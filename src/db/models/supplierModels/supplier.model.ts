import { model, Schema } from "mongoose";
import { ISubrouteType } from "../../../core/types";

export interface SupplierDocument extends Document, ISubrouteType {}

export const supplierSchema = new Schema<SupplierDocument>({


});

export const SupplierModel = model<SupplierDocument>("Supplier", supplierSchema);