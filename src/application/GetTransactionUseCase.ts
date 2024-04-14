import NotFoundError from "../domain/Error/NotFoundError";
import ServerError from "../domain/Error/ServerError";
import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import {
  badRequest,
  notFound,
  serverError,
  success,
} from "../domain/helpers/HttpHelpers";
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
        return notFound(new NotFoundError("Transaction not Found"));
      return success({
        message: "Success",
        data: {
          id: transaction.getId(),
          payer: transaction.getPayer(),
          payee: transaction.getPayee(),
          value: transaction.getValue(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
