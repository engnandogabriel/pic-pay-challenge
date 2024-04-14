import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import IConnection from "../DataBase/Connection";

export default class TransactionRepositoryMysql
  implements TransactionRepository
{
  connection: IConnection;
  constructor(connection: IConnection) {
    this.connection = connection;
  }
  async save(data: Transaction): Promise<void> {
    await this.connection.connect();
    await this.connection.query(
      "INSER INTO picpay.Transaction (id, payer, payee, value) VALUES (?, ?, ?, ?)",
      [data.getId(), data.getPayer(), data.getPayee(), data.getValue()],
      false
    );
    await this.connection.close();
  }
  async getTransactionId(id: string): Promise<void | Transaction> {
    await this.connection.connect();
    const [[query]] = await this.connection.query(
      "SELECT * FROM picpay.Transaction WHERE id = ?",
      [id],
      false
    );
    await this.connection.close();
    if (query)
      return Transaction.restore(
        query.id,
        query.payer,
        query.payee,
        query.value
      );
  }
}
