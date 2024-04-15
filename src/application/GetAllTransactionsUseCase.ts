import ServerError from "../domain/Error/ServerError";
import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import {
  badRequest,
  serverError,
  success,
} from "../domain/helpers/HttpHelpers";
import TransactionRepository from "../domain/repository/TransactionRepository";
import UseCase from "./UseCase";

export default class GetAllTransactionUseCase implements UseCase {
  transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const transactionDb =
        await this.transactionRepository.getAllTransactions();
      const transacion = [];
      if (transactionDb) {
        for (const row of transactionDb)
          transacion.push({
            id: row.getId(),
            payer: row.getPayer(),
            payee: row.getPayee(),
            value: row.getValue(),
          });
      }
      return success(200, { message: "Transaction", data: transacion });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
