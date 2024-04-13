export default class Transaction {
  readonly id: string;
  readonly payer: string;
  readonly payee: string;
  readonly value: number;

  constructor(payer: string, payee: string, value: number) {
    this.id = `${Math.floor(Math.random() * 100001)}`;
    this.payer = payer;
    this.payee = payee;
    this.value = value;
  }
}
