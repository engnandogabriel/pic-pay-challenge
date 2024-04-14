import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import TransactionRepository from "../domain/repository/TransactionRepository";
import UseCase from "./UseCase";

export default class GetTransactionUseCase implements UseCase {
  trasactionRepository: TransactionRepository;
  constructor(trasactionRepository: TransactionRepository) {
    this.trasactionRepository = trasactionRepository;
  }
  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const transaction = await this.trasactionRepository.getTransactionId(
        data.params.id
      );
      if (!transaction)
        return {
          statusCode: 404,
          body: "Transaction not found",
        };
      return {
        statusCode: 200,
        body: {
          id: transaction.getId(),
          payer: transaction.getPayer(),
          payee: transaction.getPayee(),
          value: transaction.getValue(),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { statusCode: 422, body: error.message };
      }
      return { statusCode: 500, body: "Unexpected Error" };
    }
  }
}
