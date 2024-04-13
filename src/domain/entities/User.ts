import Document from "../Value Objects/Document";
import Email from "../Value Objects/Email";
export default class User {
  readonly id: number;
  readonly name: string;
  readonly document: Document;
  readonly email: Email;
  readonly password: string;
  readonly type: string;

  constructor(
    name: string,
    document: string,
    email: string,
    password: string,
    type: string
  ) {
    this.id = Math.floor(Math.random() * 100001);
    this.name = name;
    this.document = Document.setCPF(document);
    this.email = Email.setEmail(email);
    this.password = password;
    this.type = type;
  }
}
