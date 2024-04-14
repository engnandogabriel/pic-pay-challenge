import AuthorizationGateway from "../../domain/gateway/AuthorizationGateway";
import HttpClient from "../Http/HttpClient";

export default class AuthorizationGatewayHttp implements AuthorizationGateway {
  httpCliente: HttpClient;
  constructor(httpCliente: HttpClient) {
    this.httpCliente = httpCliente;
  }
  async authorization(): Promise<any> {
    return this.httpCliente.get(
      "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
    );
  }
}
