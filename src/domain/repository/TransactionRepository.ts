import Transaction from "../entities/Transaction";

export default interface TransactionRepository {
  save(data: Transaction): Promise<void>;
  getTransactionId(id: string): Promise<Transaction | void>;
}
