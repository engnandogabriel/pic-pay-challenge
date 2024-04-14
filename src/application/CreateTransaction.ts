import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import Transaction from "../domain/entities/Transaction";
import TransactionRepository from "../domain/repository/TransactionRepository";
import UserRepository from "../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class CreateTrasactionUseCase implements UseCase {
  userRepository: UserRepository;
  transactionRepository: TransactionRepository;
  constructor(
    userRepository: UserRepository,
    transactionRepository: TransactionRepository
  ) {
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const payer = await this.userRepository.getUserById(data.body.payer);
      if (!payer)
        return {
          statusCode: 404,
          body: "Payer not found",
        };
      const payee = await this.userRepository.getUserById(data.body.payee);
      if (!payee)
        return {
          statusCode: 404,
          body: "Payee not found",
        };
      const transaction = Transaction.create(payer, payee, data.body.value);
      payer.discont(data.body.value);
      payee.add(data.body.value);
      await this.transactionRepository.save(transaction);
      await this.userRepository.updateAmount(payer);
      await this.userRepository.updateAmount(payee);
      return {
        statusCode: 201,
        body: "Transaction Created",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { statusCode: 422, body: error.message };
      }
      return { statusCode: 500, body: "Unexpected Error" };
    }
  }
}
