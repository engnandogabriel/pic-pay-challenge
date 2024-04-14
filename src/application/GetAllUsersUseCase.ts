import ServerError from "../domain/Error/ServerError";
import HttpRequest from "../domain/Protocols/HttpRequest";
import HttpResponse from "../domain/Protocols/HttpResponse";
import {
  badRequest,
  serverError,
  success,
} from "../domain/helpers/HttpHelpers";
import UserRepository from "../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class GetAllUsers implements UseCase {
  usersRepository: UserRepository;
  constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }
  async execute(data: HttpRequest): Promise<HttpResponse> {
    try {
      const usersDb = await this.usersRepository.getAllUsers();
      const user = [];
      if (usersDb) {
        for (const row of usersDb) {
          user.push({
            id: row.getId(),
            name: row.getName(),
            email: row.getEmail(),
            document: row.getDocument(),
            amount: row.getAmount(),
            type: row.getTypeUser(),
          });
        }
      }
      return success({ message: "Users", data: user });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
