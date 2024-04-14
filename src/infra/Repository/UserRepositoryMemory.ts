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
  async getUserByEmail(email: string): Promise<void | User> {
    for (const e of this.user) {
      if (e.getEmail() === email) return e;
    }
  }
  async getUserById(id: string): Promise<void | User> {
    const user = this.user.map((e) => {
      if (e.getId() === id) return e;
    });
    if (user) return user[0];
  }

  async updateAmount(data: User): Promise<void> {
    for (const e of this.user) {
      if (e.getDocument() === data.getDocument()) {
        e.getAmount();
      }
    }
  }
  async getAllUsers(): Promise<void | User[]> {
    return this.user;
  }
}
