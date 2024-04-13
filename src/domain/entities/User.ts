import Amount from "../Value Objects/Amount";
import Document from "../Value Objects/Document";
import Email from "../Value Objects/Email";
import Password from "../Value Objects/Password";
import TypeUser from "../Value Objects/TypeUser";
export default class User {
  private constructor(
    private id: string,
    private name: string,
    private document: Document,
    private email: Email,
    private password: Password,
    private type: TypeUser,
    private amount: Amount
  ) {
    this.document = document;
  }

  static async create(
    name: string,
    document: string,
    email: string,
    password: string,
    type: string,
    amount: number
  ) {
    const id = `${Math.floor(Math.random() * 100001)}`;
    return new User(
      id,
      name,
      Document.setDocument(document),
      Email.setEmail(email),
      await Password.create(password),
      TypeUser.setUser(type),
      Amount.createAmount(amount)
    );
  }
  static restore(
    id: string,
    name: string,
    document: string,
    email: string,
    password: string,
    type: string,
    amount: number
  ) {
    return new User(
      id,
      name,
      Document.setDocument(document),
      Email.setEmail(email),
      Password.restore(password),
      TypeUser.setUser(type),
      Amount.createAmount(amount)
    );
  }

  async validatePassword(password: string) {
    return this.password.validate(password);
  }
  getId() {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  getDocument(): string {
    return this.document.getValue();
  }
  getEmail(): string {
    return this.email.getValue();
  }
  getPassword() {
    return this.password.getValue();
  }
  getTypeUser() {
    return this.type.getValue();
  }
  getAmount() {
    return this.amount.getValue();
  }
}
