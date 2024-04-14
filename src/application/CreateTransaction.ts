import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import { AuthorizantionDecorator } from "../domain/decorator/Authorization";
import Transaction from "../domain/entities/Transaction";
import TransactionRepository from "../domain/repository/TransactionRepository";
import UserRepository from "../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class CreateTrasactionUseCase implements UseCase {
  userRepository: UserRepository;
  transactionRepository: TransactionRepository;
  authorizationService: AuthorizantionDecorator;
  constructor(
    userRepository: UserRepository,
    transactionRepository: TransactionRepository,
    authorizationService: AuthorizantionDecorator
  ) {
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
    this.authorizationService = authorizationService;
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
      const authorization = await this.authorizationService.execute();
      if (!authorization.authorized)
        return {
          statusCode: 422,
          body: "Transaction not authorized",
        };
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
