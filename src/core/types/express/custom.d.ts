import { JwtPayload } from "../jwt/jwt.interface";

// Esto extiende la interfaz Request de Express a nivel global en nuestro proyecto.
declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}
