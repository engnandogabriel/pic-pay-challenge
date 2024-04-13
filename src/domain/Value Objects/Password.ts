import { pbkdf2 } from "crypto";
export default class Password {
  private value: string;
  constructor(password: string) {
    this.value = password;
  }

  static create(password: string): Promise<Password> {
    if (password.length < 8) throw new Error("Invalid password");
    const generatedSalt = "saltpassword";
    return new Promise((resolve) => {
      pbkdf2(password, generatedSalt, 100, 64, "sha512", (error, value) => {
        resolve(new Password(value.toString("hex")));
      });
    });
  }
  static restore(password: string): Password {
    return new Password(password);
  }
  async validate(plainPassword: string) {
    return new Promise((resolve) => {
      pbkdf2(
        plainPassword,
        "saltpassword",
        100,
        64,
        "sha512",
        (error, value) => {
          resolve(this.value === value.toString("hex"));
        }
      );
    });
  }

  getValue() {
    return this.value;
  }
}
