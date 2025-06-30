import { container } from "tsyringe";
import { OAuthService } from "../../../services/oauthService/OAuth.service";

export const configureOAuthDependencies = async () => {

    container.register("OAuthService", {useClass : OAuthService});
}