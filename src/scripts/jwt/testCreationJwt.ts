import 'reflect-metadata';
import { container } from "tsyringe";
import { configureJwtDependencies } from "../../core/config/dependenciesJwt/dependencies";
import { TokenService } from "../../services/oauthService";
import { JwtValidator } from '../../core/utils/jwt.util';


const createJwt = async () => {
  try {
    await configureJwtDependencies();
    const jwtService = container.resolve(TokenService);

    // Solo pasar los datos básicos (sin exp/lat)
    const token = jwtService.generateToken({
      userId : 'USER9999',
    });

    console.log("📄 Token creado:", token);

    const decodedToken = jwtService.verifyToken(token);

    console.log("📄 Token decodificado:", decodedToken);

    console.log("Token tiene rol: ", JwtValidator.hasRole(decodedToken));

    console.log("Token valido: ", JwtValidator.isValid(decodedToken));

    console.log("Token tiempo: ", JwtValidator.getRemainingTime(decodedToken));

    console.log("Token tiene rol administrador: ", JwtValidator.hasMinimumRole(decodedToken, '04'));

    console.log("Token tiene rol por defecto: ", JwtValidator.getRoleOrDefault(decodedToken));

    return token;
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createJwt().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });