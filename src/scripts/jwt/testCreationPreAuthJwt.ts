import 'reflect-metadata';
import { container } from "tsyringe";
import { configureJwtDependencies } from "../../core/config/dependenciesJwt/dependencies";
import { TokenService } from "../../services/oauthService";
import { JwtValidator } from '../../core/utils/jwt.util';


const createPreAuthJwt = async () => {
  try {
    await configureJwtDependencies();
    const jwtService = container.resolve(TokenService);

    // Solo pasar los datos básicos (sin exp/lat)
    const token = jwtService.generatePreAuthToken("username", "USER9999");

    console.log("📄 Token Pre-Auth creado:", token);

    const decodedToken = jwtService.verifyPreAuthToken(token);

    console.log("📄 Token Pre-Auth decodificado:", decodedToken);

    console.log("Token Pre-Auth valido: ", JwtValidator.isValidPreAuth(decodedToken));

    return token;

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createPreAuthJwt().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });