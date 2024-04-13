export default class User {
  readonly id: number;
  readonly name: string;
  readonly document: string;
  readonly email: string;
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
    this.document = document;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
