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
import UserRepository from "../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class GetUserUseCase implements UseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.getUserByDocument(
        data.params.document
      );

      if (!user) return notFound(new NotFoundError("User not Found"));
      return success({
        message: "Success",
        data: {
          id: user.getId(),
          name: user.getName(),
          document: user.getDocument(),
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
