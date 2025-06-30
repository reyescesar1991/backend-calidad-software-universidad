import { container } from "tsyringe"
import { TokenService } from "../../../services/oauthService"
import { JWT_PREAUTH_SECRET, JWT_SECRET_TOKEN } from "../../const";
import { resolve } from "path";
import * as dotenv from 'dotenv';


export const configureJwtDependencies = async () => {

    dotenv.config({ path: resolve(process.cwd(), ".env") });

    const jwtSecret = process.env.JWT_SECRET; // Obtén de variables de entorno

    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está definido en .env');
    }

    container.registerInstance(JWT_SECRET_TOKEN, jwtSecret);

    const jwtPreAuthSecret = process.env.JWT_PREAUTH_SECRET; // Obtén de variables de entorno

    if (!jwtPreAuthSecret) {
        throw new Error('JWT_PREAUTH_SECRET no está definido en .env');
    }

    container.registerInstance(JWT_PREAUTH_SECRET, jwtPreAuthSecret);

    container.register("JwtService", { useClass: TokenService });
}