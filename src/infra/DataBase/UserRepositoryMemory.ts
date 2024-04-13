import User from "../../domain/entities/User";
import UserRepository from "../../domain/repository/UserRepository";

export default class UserRepositoryMemory implements UserRepository {
  user: Array<User>;
  constructor() {
    this.user = [];
  }
  async save(data: User): Promise<void> {
    this.user.push(data);
  }
  async getUserByDocument(document: string): Promise<void | User> {
    for (const e of this.user) {
      if (e.getDocument() === document) return e;
    }
  }
  async updateAmount(data: User): Promise<void> {
    for (const e of this.user) {
      if (e.getDocument() === data.getDocument()) {
        e.getAmount();
      }
    }
  }
}
