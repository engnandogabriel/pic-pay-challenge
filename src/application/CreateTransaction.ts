import NotFoundError from "../domain/Error/NotFoundError";
import ServerError from "../domain/Error/ServerError";
import UnauthorizedError from "../domain/Error/UnauthorizedError";
import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import { AuthorizantionDecorator } from "../domain/decorator/Authorization";
import Transaction from "../domain/entities/Transaction";
import EmailSenderGateway from "../domain/gateway/EmailSenderGateway";
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
  emailSender: EmailSenderGateway;
  constructor(
    userRepository: UserRepository,
    transactionRepository: TransactionRepository,
    authorizationService: AuthorizantionDecorator,
    emailSender: EmailSenderGateway
  ) {
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
    this.authorizationService = authorizationService;
    this.emailSender = emailSender;
  }

  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const payer = await this.userRepository.getUserById(data.body.payer);
      if (!payer) return notFound(new NotFoundError("Payer not found"));
      const payee = await this.userRepository.getUserById(data.body.payee);
      if (!payee) return notFound(new NotFoundError("Payee not found"));
      const transaction = Transaction.create(payer, payee, data.body.value);
      payer.discont(data.body.value);
      payee.add(data.body.value);
      const authorization = await this.authorizationService.execute();
      if (!authorization.authorized)
        return unauthorized(new UnauthorizedError());
      await this.transactionRepository.save(transaction);
      await this.userRepository.updateAmount(payer);
      await this.userRepository.updateAmount(payee);
      await this.emailSender.sender(payer, payee, data.body.value);
      return success(201, { message: "Transaction created" });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
