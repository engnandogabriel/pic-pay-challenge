import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";

export default class TransactionRepositoryMemory
  implements TransactionRepository
{
  transaction: Array<Transaction>;
  constructor() {
    this.transaction = [];
  }

  async save(data: Transaction): Promise<void> {
    this.transaction.push(data);
  }
  async getTransactionId(id: string): Promise<void | Transaction> {
    for (const transaction of this.transaction) {
      if (transaction.getId() === id) return transaction;
    }
  }
  async getAllTransactions(): Promise<void | Transaction[]> {
    return this.transaction;
  }
}
