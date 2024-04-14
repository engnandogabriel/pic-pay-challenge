import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
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

      if (!user)
        return {
          statusCode: 404,
          body: "User not found",
        };
      return {
        statusCode: 200,
        body: {
          id: user.getId(),
          name: user.getName(),
          document: user.getDocument(),
          email: user.getEmail(),
          type: user.getTypeUser(),
          amount: user.getAmount(),
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
