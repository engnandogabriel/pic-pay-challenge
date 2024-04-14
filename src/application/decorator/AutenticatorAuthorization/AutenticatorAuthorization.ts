import { AuthorizantionDecorator } from "../../../domain/decorator/Authorization";
import AuthorizationGateway from "../../../domain/gateway/AuthorizationGateway";

export default class AutenticatorAuthorizationDecorator
  implements AuthorizantionDecorator
{
  authorizationGateway: AuthorizationGateway;
  constructor(authorizationGateway: AuthorizationGateway) {
    this.authorizationGateway = authorizationGateway;
  }
  async execute(): Promise<Output> {
    try {
      const response = await this.authorizationGateway.authorization();
      if (response.data.message.toLowerCase() === "autorizado")
        return {
          authorized: true,
          data: response.message,
        };

      return {
        authorized: false,
        data: response.message,
      };
    } catch (e) {
      if (e instanceof Error)
        return {
          authorized: false,
          data: e.message,
        };

      return {
        authorized: false,
        data: "Unexpected Error",
      };
    }
  }
}

type Output = {
  authorized: boolean;
  data: string;
};
