import User from "./User";

export default class Transaction {
  private constructor(
    private id: string,
    private payer: string,
    private payee: string,
    private value: number
  ) {}

  static create(payer: User, payee: User, value: number) {
    const id = `${Math.floor(Math.random() * 100001)}`;
    if (payer.getTypeUser() !== "commun")
      throw new Error("Must be a user commun");

    if (payer.getAmount() < value)
      throw new Error("Must have a amount greater than transaction value");

    if (value <= 0)
      throw new Error("The value of transaction must be greater than 0");
    return new Transaction(id, payer.getId(), payee.getId(), value);
  }

  static restore(id: string, payer: string, payee: string, value: number) {
    return new Transaction(id, payer, payee, value);
  }

  getId() {
    return this.id;
  }
  getPayer() {
    return this.payer;
  }
  getPayee() {
    return this.payee;
  }
  getValue() {
    return this.value;
  }
}
