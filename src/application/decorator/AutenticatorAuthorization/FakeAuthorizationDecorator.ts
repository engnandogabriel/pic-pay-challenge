import { AuthorizantionDecorator } from "../../../domain/decorator/Authorization";

export default class FakeAuthorizationDecorator
  implements AuthorizantionDecorator
{
  async execute(): Promise<{ authorized: boolean; data: string }> {
    try {
      return {
        authorized: false,
        data: "Nao Autorizado",
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
