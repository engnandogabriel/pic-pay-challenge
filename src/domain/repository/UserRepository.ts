import User from "../entities/User";

export default interface UserRepository {
  save(data: User): Promise<void>;
  getUserByDocument(document: string): Promise<User | void>;
  updateAmount(data: User): Promise<void>;
  getUserById(id: string): Promise<User | void>;
}
