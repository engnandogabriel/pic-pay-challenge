import NotFoundError from "../domain/Error/NotFoundError";
import ServerError from "../domain/Error/ServerError";
import UnauthorizedError from "../domain/Error/UnauthorizedError";
import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import { AuthorizantionDecorator } from "../domain/decorator/Authorization";
import Transaction from "../domain/entities/Transaction";
import {
  badRequest,
  notFound,
  serverError,
  success,
  unauthorized,
} from "../domain/helpers/HttpHelpers";
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
      if (!payer) return notFound(new NotFoundError("Payer not fount"));
      const payee = await this.userRepository.getUserById(data.body.payee);
      if (!payee) return notFound(new NotFoundError("Payee not fount"));
      const transaction = Transaction.create(payer, payee, data.body.value);
      payer.discont(data.body.value);
      payee.add(data.body.value);
      const authorization = await this.authorizationService.execute();
      if (!authorization.authorized)
        return unauthorized(new UnauthorizedError());
      await this.transactionRepository.save(transaction);
      await this.userRepository.updateAmount(payer);
      await this.userRepository.updateAmount(payee);
      return success({ message: "Transaction created" });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
