import User from "../../domain/entities/User";
import EmailSenderGateway from "../../domain/gateway/EmailSenderGateway";
import HttpClient from "../Http/HttpClient";

export default class EmailSender implements EmailSenderGateway {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async sender(from: User, to: User, value: number): Promise<any> {
    const data = {
      from: from.getEmail(),
      to: from.getEmail(),
      message: `Olá ${to.getName()}. Você recebeu uma tranferência de ${from.getName()} no valor de R$ ${value}`,
      date: new Date(),
    };
    const response = await this.httpClient.post(
      "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6",
      data
    );
    return { response, data };
  }
}
