import ServerError from "../domain/Error/ServerError";
import UnauthorizedError from "../domain/Error/UnauthorizedError";
import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import User from "../domain/entities/User";
import {
  badRequest,
  serverError,
  success,
} from "../domain/helpers/HttpHelpers";
import UserRepository from "../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class CreateUserUseCase implements UseCase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const userWithDocument = await this.userRepository.getUserByDocument(
        data.body.document
      );
      if (userWithDocument)
        return badRequest(new UnauthorizedError("Document in using"));
      const userWithEmail = await this.userRepository.getUserByEmail(
        data.body.document
      );
      if (userWithEmail)
        return badRequest(new UnauthorizedError("Email in using"));
      const user = await User.create(
        data.body.name,
        data.body.document,
        data.body.email,
        data.body.password,
        data.body.type,
        data.body.amount
      );
      await this.userRepository.save(user);
      return success({
        message: "User Created",
        data: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          type: user.getTypeUser(),
          amount: user.getAmount(),
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
