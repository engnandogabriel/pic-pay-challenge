export default class Amount {
  private value: number;
  constructor(amount: number) {
    this.value = amount;
  }

  static createAmount(amount: number) {
    if (amount > 0) return new Amount(amount);
    throw new Error("Amount is Invalid");
  }

  addtion(value: number) {
    if (value < 0) throw new Error("Amount is Invalid");
    this.value += value;
  }
  discont(value: number) {
    if (value < 0) throw new Error("Amount is Invalid");
    this.value -= value;
  }
  getValue() {
    return this.value;
  }
}
