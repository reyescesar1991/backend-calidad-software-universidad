import { updatePermissionSchemaZod } from "../../../../validations";

export const labelSchema = updatePermissionSchemaZod.pick({ label: true });