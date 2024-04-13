export default class TypeUser {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }

  static setUser(typeUser: string) {
    if (typeUser === "commun" || typeUser === "merchant")
      return new TypeUser(typeUser);
    throw new Error("Type User is invalid!");
  }

  getValue(): string {
    return this.value;
  }
}
