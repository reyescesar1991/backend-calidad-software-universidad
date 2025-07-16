import { z } from "zod";

// Define a general structure for successful API responses
export const apiResponseSchema = z.object({
    message: z.string().optional(), // A human-readable message, optional for some success cases
    code: z.string().optional(),    // An optional internal code for specific success/error types
    data: z.any().optional(),       // The actual payload
});