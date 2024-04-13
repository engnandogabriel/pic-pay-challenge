import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import User from "../domain/entities/User";
import UserRepository from "../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class CreateUserUseCase implements UseCase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await User.create(
        data.body.name,
        data.body.document,
        data.body.email,
        data.body.password,
        data.body.type,
        data.body.amount
      );
      await this.userRepository.save(user);
      return { statusCode: 201, body: "User created" };
    } catch (error) {
      if (error instanceof Error) {
        return { statusCode: 422, body: error.message };
      }
      return { statusCode: 500, body: "Unexpected Error" };
    }
  }
}
