import User from "../../domain/entities/User";
import UserRepository from "../../domain/repository/UserRepository";
import IConnection from "../DataBase/Connection";

export default class UserRepositoryMysql implements UserRepository {
  connection: IConnection;
  constructor(connection: IConnection) {
    this.connection = connection;
  }

  async save(data: User): Promise<void> {
    await this.connection.connect();
    await this.connection.query(
      "INSERT INTO picpay.User (id, name, document, email, password, type, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.getId(),
        data.getName(),
        data.getDocument(),
        data.getEmail(),
        data.getPassword(),
        data.getTypeUser(),
        data.getAmount(),
      ],
      false
    );
    await this.connection.close();
  }
  async getUserByDocument(document: string): Promise<void | User> {
    await this.connection.connect();
    const [[query]] = await this.connection.query(
      "SELECT * FROM picpay.User WHERE document = ?",
      [document],
      false
    );
    await this.connection.close();
    if (query)
      return User.restore(
        query.id,
        query.name,
        query.document,
        query.email,
        query.password,
        query.type,
        query.amount
      );
  }
  async getUserById(id: string): Promise<void | User> {
    await this.connection.connect();
    const [[query]] = await this.connection.query(
      "SELECT * FROM picpay.User WHERE id = ?",
      [id],
      false
    );
    await this.connection.close();
    if (query)
      return User.restore(
        query.id,
        query.name,
        query.document,
        query.email,
        query.password,
        query.type,
        query.amount
      );
  }
  async updateAmount(data: User): Promise<void> {
    console.log(data);
    await this.connection.connect();
    await this.connection.query(
      "UPDATE picpay.User SET amount = ? WHERE document = ?",
      [data.getAmount(), data.getDocument()],
      false
    );
    await this.connection.close();
  }
}
