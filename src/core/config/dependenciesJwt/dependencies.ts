import { container } from "tsyringe"
import { TokenService } from "../../../services/oauthService"
import { JWT_SECRET_TOKEN } from "../../const";
import { resolve } from "path";
import * as dotenv from 'dotenv';


export const configureJwtDependencies = async () => {

    dotenv.config({ path: resolve(process.cwd(), ".env") });

    const jwtSecret = process.env.JWT_SECRET; // Obtén de variables de entorno

    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está definido en .env');
    }

    container.registerInstance(JWT_SECRET_TOKEN, jwtSecret);

    container.register("JwtService", { useClass: TokenService });
}